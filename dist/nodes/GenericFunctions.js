"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globedomRequest = globedomRequest;
exports.getauthtoken = getauthtoken;
exports.tlogout = tlogout;
const xml2js_1 = require("xml2js");
const n8n_workflow_1 = require("n8n-workflow");
async function globedomRequest(endpoint, body, authsid = '', method) {
    const credentials = (await this.getCredentials('globedom'));
    const options = {
        headers: {
            'content-type': 'text/xml',
        },
        method,
        body,
        url: `${credentials.server}:2109${endpoint}`,
        json: false,
    };
    const parserOptions = Object.assign({ mergeAttrs: true, trim: true, explicitArray: false });
    const parser = new xml2js_1.Parser(parserOptions);
    try {
        const response = await this.helpers.request(options);
        const sanitized = response.replace(/&(?!(?:apos|quot|[gl]t|amp);|#)/g, '&amp;');
        const parsed = await parser.parseStringPromise(sanitized);
        if (parsed.multiresponse) {
            return parsed.multiresponse.response;
        }
        return parsed.response;
    }
    catch (error) {
        throw new n8n_workflow_1.NodeApiError(this.getNode(), { error });
    }
}
async function getauthtoken() {
    const credentials = (await this.getCredentials('globedom'));
    const body = `<request><uid>${credentials.uid}</uid><pwd>${credentials.password}</pwd></request>`;
    const options = {
        headers: {
            'content-type': 'text/xml',
        },
        method: 'PUT',
        body,
        url: `${credentials.server}:2109/susi/account/login/*/*/*/`,
        json: false,
    };
    const parserOptions = Object.assign({ mergeAttrs: true, explicitArray: false });
    const parser = new xml2js_1.Parser(parserOptions);
    const response = await this.helpers.request(options);
    const parsed = await parser.parseStringPromise(response);
    const authsid = parsed.response.token;
    return authsid;
}
async function tlogout(authsid) {
    const credentials = (await this.getCredentials('globedom'));
    const options = {
        headers: {
            'content-type': 'text/xml',
        },
        method: 'GET',
        url: `${credentials.server}:2109/susi/account/logout/*/*/${authsid}/`,
        json: false,
    };
    const parserOptions = Object.assign({ mergeAttrs: true, explicitArray: false });
    const parser = new xml2js_1.Parser(parserOptions);
    const response = await this.helpers.request(options);
    await parser.parseStringPromise(response);
    return authsid;
}
//# sourceMappingURL=GenericFunctions.js.map