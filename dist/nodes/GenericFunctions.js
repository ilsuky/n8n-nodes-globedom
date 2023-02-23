"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getauthtoken = exports.globedomRequest = void 0;
const axios_1 = require("axios");
const xml_js_1 = require("xml-js");
async function globedomRequest(endpoint, qs = {}, authsid = '') {
    const credentials = await this.getCredentials('globedom');
    return credentials;
}
exports.globedomRequest = globedomRequest;
async function getauthtoken() {
    const credentials = await this.getCredentials('globedom');
    const body = `<request><uid>${credentials.uid}</uid><pwd>${credentials.password}</pwd></request>`;
    const https = require('https');
    const { data } = await axios_1.default.put(`${credentials.server}:2109/susi/account/login/*/*/*/`, { body }, {
        headers: {
            'Content-Type': 'text/xml'
        },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    });
    const json = xml_js_1.xml2json(data);
    console.log(json);
    return json;
}
exports.getauthtoken = getauthtoken;
//# sourceMappingURL=GenericFunctions.js.map