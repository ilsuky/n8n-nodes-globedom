"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.globedomRequest = globedomRequest;
exports.getauthtoken = getauthtoken;
exports.tlogout = tlogout;
const xml2js_1 = require("xml2js");
const https = __importStar(require("https"));
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
        agent: new https.Agent({
            rejectUnauthorized: false,
        }),
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
        agent: new https.Agent({
            rejectUnauthorized: false,
        }),
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
        agent: new https.Agent({
            rejectUnauthorized: false,
        }),
    };
    const parserOptions = Object.assign({ mergeAttrs: true, explicitArray: false });
    const parser = new xml2js_1.Parser(parserOptions);
    const response = await this.helpers.request(options);
    await parser.parseStringPromise(response);
    return authsid;
}
//# sourceMappingURL=GenericFunctions.js.map