"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getauthtoken = exports.globedomRequest = void 0;
async function globedomRequest(endpoint, qs = {}, authsid = '') {
    const credentials = await this.getCredentials('globedom');
    const options = {
        headers: {},
        method: 'GET',
        qs,
        uri: `${credentials.server}${endpoint}`,
    };
    const returnr = await this.helpers.request(options);
    const dataObject = {};
    return dataObject;
}
exports.globedomRequest = globedomRequest;
async function getauthtoken() {
    const credentials = await this.getCredentials('globedom');
    const body = `<request><uid>${credentials.uid}</uid><pwd>${credentials.password}</pwd></request>`;
    const options = {
        method: 'PUT',
        headers: {
            'content-type': 'text/xml',
        },
        body,
        url: `${credentials.server}:2109/susi/account/login/*/*/*/`,
        skipSslCertificateValidation: true
    };
    console.log(options);
    const response = await this.helpers.httpRequest(options);
    console.log(response);
    let authsid = "";
    return authsid;
}
exports.getauthtoken = getauthtoken;
//# sourceMappingURL=GenericFunctions.js.map