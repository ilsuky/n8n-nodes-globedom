"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getauthtoken = exports.globedomRequest = void 0;
const axios_1 = require("axios");
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
    console.log(data);
    let authsid = "";
    return authsid;
}
exports.getauthtoken = getauthtoken;
//# sourceMappingURL=GenericFunctions.js.map