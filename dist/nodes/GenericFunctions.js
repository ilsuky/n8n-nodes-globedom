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
    let list = [];
    const splitData = returnr.split('\n');
    for (let row of splitData) {
        if (row.includes(":")) {
            const split = row.split(':');
            dataObject[split[0]] = split[1].trim();
        }
        else if (row.length > 0) {
            list.push(row);
        }
    }
    dataObject.list = list;
    return dataObject;
}
exports.globedomRequest = globedomRequest;
async function getauthtoken() {
    const credentials = await this.getCredentials('globedom');
    const body = `<request><uid>${credentials.uid}</uid><pwd>${credentials.password}</pwd></request>`;
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'text/xml',
        },
        body,
        uri: `${credentials.server}:2109/susi/account/login/*/*/*/`,
        resolveWithFullResponse: true,
        rejectUnauthorized: false,
    };
    console.log(options);
    const authsidr = await this.helpers.request(options);
    console.log(authsidr);
    let authsid = "";
    return authsid;
}
exports.getauthtoken = getauthtoken;
//# sourceMappingURL=GenericFunctions.js.map