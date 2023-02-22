"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globedom = void 0;
const GenericFunctions_1 = require("./GenericFunctions");
class globedom {
    constructor() {
        this.description = {
            displayName: 'Globedom',
            name: 'globedom',
            icon: 'file:globedom.png',
            group: ['transform'],
            version: 1,
            description: 'Globedom/internic XML API',
            defaults: {
                name: 'globedom',
                color: '#772244',
            },
            subtitle: '={{$parameter["namespace"]}}',
            inputs: ['main'],
            outputs: ['main'],
            credentials: [
                {
                    name: 'globedom',
                    required: true,
                },
            ],
            properties: [
                {
                    displayName: 'Requests',
                    name: 'requests',
                    type: 'options',
                    options: [
                        {
                            name: 'Domains',
                            value: 'domains',
                        },
                        {
                            name: 'Contact',
                            value: 'contacts',
                        },
                        {
                            name: 'Nameservers',
                            value: 'nameservers',
                        },
                    ],
                    default: 'domains',
                    description: 'Requests',
                },
                {
                    displayName: 'Domains',
                    name: 'domains',
                    type: 'options',
                    options: [
                        {
                            name: 'Create',
                            value: 'domain-create',
                        },
                        {
                            name: 'Status',
                            value: 'domain-status',
                        },
                        {
                            name: 'Update',
                            value: 'domain-update',
                        },
                        {
                            name: 'Show All',
                            value: 'domain-all',
                        },
                    ],
                    default: 'domain-create',
                    description: 'Domain related requests',
                    displayOptions: {
                        show: {
                            requests: [
                                'domains',
                            ],
                        },
                    },
                },
                {
                    displayName: 'Contacts',
                    name: 'contacts',
                    type: 'options',
                    options: [
                        {
                            name: 'Create',
                            value: 'contacts-create',
                        },
                        {
                            name: 'Info',
                            value: 'contacts-info',
                        },
                        {
                            name: 'Update',
                            value: 'contacts-update',
                        },
                        {
                            name: 'Show All',
                            value: 'contacts-all',
                        },
                    ],
                    default: 'contacts-create',
                    description: 'Contact related requests',
                    displayOptions: {
                        show: {
                            requests: [
                                'contacts',
                            ],
                        },
                    },
                },
                {
                    displayName: 'Nameservers',
                    name: 'nameservers',
                    type: 'options',
                    options: [
                        {
                            name: 'Create',
                            value: 'nameservers-create',
                        },
                        {
                            name: 'Show All',
                            value: 'nameservers-all',
                        },
                    ],
                    default: 'nameservers-create',
                    description: 'Nameserver related requests',
                    displayOptions: {
                        show: {
                            requests: [
                                'nameservers',
                            ],
                        },
                    },
                },
                {
                    displayName: 'Domain',
                    name: 'domain',
                    type: 'string',
                    displayOptions: {
                        show: {
                            requests: [
                                'domains',
                            ],
                            domains: [
                                'domain-create',
                                'domain-status',
                                'domain-update',
                            ],
                        },
                    },
                    default: '',
                    required: true,
                    description: 'Domain name',
                },
                {
                    displayName: 'owner-c',
                    name: 'ownerc',
                    type: 'string',
                    displayOptions: {
                        show: {
                            requests: [
                                'domains',
                            ],
                            domains: [
                                'domain-create',
                                'domain-update',
                            ],
                        },
                    },
                    default: '',
                    required: true,
                    description: 'Owner contact handle',
                },
                {
                    displayName: 'billing-c',
                    name: 'billingc',
                    type: 'string',
                    displayOptions: {
                        show: {
                            requests: [
                                'domains',
                            ],
                            domains: [
                                'domain-create',
                                'domain-update',
                            ],
                        },
                    },
                    default: '',
                    required: true,
                    description: 'Billing contact handle',
                },
                {
                    displayName: 'admin-c',
                    name: 'adminc',
                    type: 'string',
                    displayOptions: {
                        show: {
                            requests: [
                                'domains',
                            ],
                            domains: [
                                'domain-create',
                                'domain-update',
                            ],
                        },
                    },
                    default: '',
                    required: true,
                    description: 'Administrative contact handle',
                },
                {
                    displayName: 'tech-c',
                    name: 'techc',
                    type: 'string',
                    displayOptions: {
                        show: {
                            requests: [
                                'domains',
                            ],
                            domains: [
                                'domain-create',
                                'domain-update',
                            ],
                        },
                    },
                    default: '',
                    required: true,
                    description: 'Technical contact handle',
                },
                {
                    displayName: 'ns-list',
                    name: 'nslist',
                    type: 'string',
                    displayOptions: {
                        show: {
                            requests: [
                                'domains',
                            ],
                            domains: [
                                'domain-create',
                                'domain-update',
                            ],
                        },
                    },
                    default: 'ns1.cnh.at,ns2.cnh.at,ns3.cnh.at',
                    required: true,
                    description: 'List of name servers, delimited by colon',
                },
                {
                    displayName: 'tld',
                    name: 'tld',
                    type: 'string',
                    displayOptions: {
                        show: {
                            requests: [
                                'contacts',
                            ],
                            contacts: [
                                'contact-create',
                                'query-contact-list',
                            ],
                        },
                    },
                    default: '',
                    required: false,
                    description: 'target TLD where this contact is intended to be used.',
                },
                {
                    displayName: 'name',
                    name: 'name',
                    type: 'string',
                    displayOptions: {
                        show: {
                            requests: [
                                'contacts',
                            ],
                            contacts: [
                                'contact-create',
                            ],
                        },
                    },
                    default: '',
                    description: 'full name (if empty, fname + lname will be used)',
                },
                {
                    displayName: 'fname',
                    name: 'fname',
                    type: 'string',
                    displayOptions: {
                        show: {
                            requests: [
                                'contacts',
                            ],
                            contacts: [
                                'contact-create',
                            ],
                        },
                    },
                    default: '',
                    description: 'first name',
                },
                {
                    displayName: 'lname',
                    name: 'lname',
                    type: 'string',
                    displayOptions: {
                        show: {
                            requests: [
                                'contacts',
                            ],
                            contacts: [
                                'contact-create',
                            ],
                        },
                    },
                    default: '',
                    description: 'last name',
                },
                {
                    displayName: 'organization',
                    name: 'organization',
                    type: 'string',
                    displayOptions: {
                        show: {
                            requests: [
                                'contacts',
                            ],
                            contacts: [
                                'contact-create',
                            ],
                        },
                    },
                    default: '',
                    description: 'optional if individual',
                },
                {
                    displayName: 'email',
                    name: 'email',
                    type: 'string',
                    displayOptions: {
                        show: {
                            requests: [
                                'contacts',
                            ],
                            contacts: [
                                'contact-create',
                            ],
                        },
                    },
                    default: '',
                    required: true,
                    description: 'email',
                },
                {
                    displayName: 'address',
                    name: 'address-1',
                    type: 'string',
                    displayOptions: {
                        show: {
                            requests: [
                                'contacts',
                            ],
                            contacts: [
                                'contact-create',
                            ],
                        },
                    },
                    default: '',
                    required: true,
                    description: 'address',
                },
                {
                    displayName: 'city',
                    name: 'city',
                    type: 'string',
                    displayOptions: {
                        show: {
                            requests: [
                                'contacts',
                            ],
                            contacts: [
                                'contact-create',
                            ],
                        },
                    },
                    default: '',
                    required: true,
                    description: 'city',
                },
                {
                    displayName: 'postal-code',
                    name: 'postal-code',
                    type: 'string',
                    displayOptions: {
                        show: {
                            requests: [
                                'contacts',
                            ],
                            contacts: [
                                'contact-create',
                            ],
                        },
                    },
                    default: '',
                    required: true,
                    description: 'postal-code',
                },
                {
                    displayName: 'country',
                    name: 'country',
                    type: 'string',
                    displayOptions: {
                        show: {
                            requests: [
                                'contacts',
                            ],
                            contacts: [
                                'contact-create',
                            ],
                        },
                    },
                    default: '',
                    required: true,
                    description: 'ISO country code (2 letters) - ex. AT',
                },
                {
                    displayName: 'phone',
                    name: 'phone',
                    type: 'string',
                    displayOptions: {
                        show: {
                            requests: [
                                'contacts',
                            ],
                            contacts: [
                                'contact-create',
                            ],
                        },
                    },
                    default: '+43.',
                    required: true,
                    description: 'phone ex. +43.5223.5855',
                },
            ]
        };
    }
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        const length = items.length;
        const requests = this.getNodeParameter('requests', 0, '');
        const authsid = await GenericFunctions_1.getauthtoken.call(this);
        for (let itemIndex = 0; itemIndex < length; itemIndex++) {
            try {
                if (requests == 'domains') {
                    const domains = this.getNodeParameter('domains', 0, '');
                    if (domains === 'domain-all') {
                        const rbody = {};
                        const newItem = {
                            json: {},
                            binary: {},
                        };
                        const endpoint = "/susi/domain/all/*/*/" + authsid + "/";
                        newItem.json = await GenericFunctions_1.globedomRequest.call(this, endpoint, rbody, authsid);
                        returnData.push(newItem);
                    }
                    if (domains === 'domain-check') {
                        const domain = this.getNodeParameter('domain', itemIndex, '');
                        const checkprice = this.getNodeParameter('checkprice', itemIndex, '');
                        const rbody = { "domain": domain, "check-price": checkprice };
                        const newItem = {
                            json: {},
                            binary: {},
                        };
                        const endpoint = "/susi/domain/all/*/*/" + authsid + "/";
                        newItem.json = await GenericFunctions_1.globedomRequest.call(this, endpoint, rbody, authsid);
                        returnData.push(newItem);
                    }
                    if (domains === 'domain-create') {
                        const domain = this.getNodeParameter('domain', itemIndex, '');
                        const ownerc = this.getNodeParameter('ownerc', itemIndex, '');
                        const billingc = this.getNodeParameter('billingc', itemIndex, '');
                        const adminc = this.getNodeParameter('adminc', itemIndex, '');
                        const techc = this.getNodeParameter('techc', itemIndex, '');
                        const nslist = this.getNodeParameter('nslist', itemIndex, '');
                        const rbody = { "domain": domain, "owner-c": ownerc, "billing-c": billingc, "admin-c": adminc, "tech-c": techc, "ns-list": nslist };
                        const newItem = {
                            json: {},
                            binary: {},
                        };
                        const endpoint = "/susi/domain/all/*/*/" + authsid + "/";
                        newItem.json = await GenericFunctions_1.globedomRequest.call(this, endpoint, rbody, authsid);
                        returnData.push(newItem);
                    }
                }
                if (requests == 'contacts') {
                    const contacts = this.getNodeParameter('contacts', 0, '');
                    if (contacts === 'query-contact-list') {
                        const pattern = this.getNodeParameter('pattern', itemIndex, '');
                        const tld = this.getNodeParameter('tld', itemIndex, '');
                        if (tld) {
                            const rbody = { "pattern": pattern, "tld": tld, "extended-format": "1" };
                            const newItem = {
                                json: {},
                                binary: {},
                            };
                            const endpoint = "/susi/domain/all/*/*/" + authsid + "/";
                            newItem.json = await GenericFunctions_1.globedomRequest.call(this, endpoint, rbody, authsid);
                            returnData.push(newItem);
                        }
                        else {
                            const rbody = { "pattern": pattern, "extended-format": "1" };
                            const newItem = {
                                json: {},
                                binary: {},
                            };
                            const endpoint = "/susi/domain/all/*/*/" + authsid + "/";
                            newItem.json = await GenericFunctions_1.globedomRequest.call(this, endpoint, rbody, authsid);
                            returnData.push(newItem);
                        }
                    }
                    if (contacts === 'contact-create') {
                        const tld = this.getNodeParameter('tld', itemIndex, '');
                        const name = this.getNodeParameter('name', itemIndex, '');
                        const fname = this.getNodeParameter('fname', itemIndex, '');
                        const lname = this.getNodeParameter('lname', itemIndex, '');
                        const organization = this.getNodeParameter('organization', itemIndex, '');
                        const address1 = this.getNodeParameter('address-1', itemIndex, '');
                        const city = this.getNodeParameter('city', itemIndex, '');
                        const email = this.getNodeParameter('email', itemIndex, '');
                        const postalcode = this.getNodeParameter('postal-code', itemIndex, '');
                        const country = this.getNodeParameter('country', itemIndex, '');
                        const phone = this.getNodeParameter('phone', itemIndex, '');
                        if (name) {
                            const rbody = { "tld": tld, "name": name, "organization": organization, "address-1": address1, "city": city, "email": email, "postal-code": postalcode, "country": country, "phone": phone, "lang": "DE" };
                            const newItem = {
                                json: {},
                                binary: {},
                            };
                            const endpoint = "/susi/domain/all/*/*/" + authsid + "/";
                            newItem.json = await GenericFunctions_1.globedomRequest.call(this, endpoint, rbody, authsid);
                            returnData.push(newItem);
                        }
                        else {
                            const rbody = { "tld": tld, "fname": fname, "lname": lname, "organization": organization, "address-1": address1, "city": city, "email": email, "postal-code": postalcode, "country": country, "phone": phone, "lang": "DE" };
                            const newItem = {
                                json: {},
                                binary: {},
                            };
                            const endpoint = "/susi/domain/all/*/*/" + authsid + "/";
                            newItem.json = await GenericFunctions_1.globedomRequest.call(this, endpoint, rbody, authsid);
                            returnData.push(newItem);
                        }
                    }
                }
            }
            catch (error) {
                if (this.continueOnFail()) {
                    returnData.push({
                        json: {
                            error: error.message,
                        },
                        pairedItem: {
                            item: itemIndex,
                        },
                    });
                    continue;
                }
                throw error;
            }
        }
        return this.prepareOutputData(returnData);
    }
}
exports.globedom = globedom;
//# sourceMappingURL=globedom.node.js.map