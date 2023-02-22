"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globedom = void 0;
class globedom {
    constructor() {
        this.name = 'globedom';
        this.documentationUrl = 'https://globedom.internic.at/xml/';
        this.displayName = 'globedom.com';
        this.properties = [
            {
                displayName: 'Server',
                name: 'server',
                type: 'string',
                default: 'https://susi.globedom.com',
            },
            {
                displayName: 'Username',
                name: 'uid',
                type: 'string',
                default: '3000',
            },
            {
                displayName: 'Password',
                name: 'password',
                type: 'string',
                default: '89vc8Dd87R',
            }
        ];
    }
}
exports.globedom = globedom;
//# sourceMappingURL=globedom.credentials.js.map