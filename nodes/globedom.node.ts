import { IExecuteFunctions } from 'n8n-core';
import { INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';
import { globedomRequest, getauthtoken } from './GenericFunctions';
import { parse } from 'tldts';

export class globedom implements INodeType {
	description: INodeTypeDescription = {
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
						name: 'Check',
						value: 'domain-check',
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
						name: 'Delete',
						value: 'domain-delete',
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
						requests:[
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
						requests:[
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
						requests:[
							'nameservers',
						],
					},
				},					
			},
////// Domains			
			{
				displayName: 'Domain',
				name: 'domain',
				type: 'string',
				displayOptions: {
					show: {
						requests:[
							'domains',
						],						
						domains:[
							'domain-create',
							'domain-status',
							'domain-check',
							'domain-update',						
							'domain-delete',						
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
						requests:[
							'domains',
						],						
						domains:[
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
						requests:[
							'domains',
						],						
						domains:[
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
						requests:[
							'domains',
						],						
						domains:[
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
						requests:[
							'domains',
						],						
						domains:[
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
						requests:[
							'domains',
						],						
						domains:[
							'domain-create',
							'domain-update',						
						],					
					},
				},
				default: 'ns1.cnh.at,ns2.cnh.at,ns3.cnh.at',
				required: true,
				description: 'List of name servers, delimited by colon',
			},
////// Contact		
			{
				displayName: 'tld',
				name: 'tld',
				type: 'string',
				displayOptions: {
					show: {
						requests:[
							'contacts',
						],						
						contacts:[
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
						requests:[
							'contacts',
						],						
						contacts:[
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
						requests:[
							'contacts',
						],						
						contacts:[
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
						requests:[
							'contacts',
						],						
						contacts:[
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
						requests:[
							'contacts',
						],						
						contacts:[
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
						requests:[
							'contacts',
						],						
						contacts:[
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
						requests:[
							'contacts',
						],						
						contacts:[
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
						requests:[
							'contacts',
						],						
						contacts:[
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
						requests:[
							'contacts',
						],						
						contacts:[
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
						requests:[
							'contacts',
						],						
						contacts:[
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
						requests:[
							'contacts',
						],						
						contacts:[
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
	
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const { getPublicSuffix , getDomainWithoutSuffix } = require('tldts');
		const returnData: INodeExecutionData[] = [];
		const length = items.length;
		
		const requests = this.getNodeParameter('requests',  0, '') as string;
			
		const authsid = await getauthtoken.call(this);
		
		for (let itemIndex = 0; itemIndex < length; itemIndex++) {
			try {
				///
				// https://globedom.internic.at/xml/
				///
				
				//--------------------------------------------------------
				// 				Domains
				//--------------------------------------------------------
				if(requests == 'domains'){
					const domains = this.getNodeParameter('domains',  0, '') as string;
					if (domains === 'domain-all') {
					
						const rbody = {};
						
						const newItem: INodeExecutionData = {
							json: {},
							binary: {},
						};
						
						const endpoint = "/susi/domain/all/*/*/" + authsid + "/";
						
						newItem.json = await globedomRequest.call(this, endpoint, rbody, authsid, "GET");
						returnData.push(newItem);												
					}	
					
					if (domains === 'domain-check') {
						const domain = this.getNodeParameter('domain', itemIndex, '') as string;
						const tld = getPublicSuffix(domain);
						const domainname = getDomainWithoutSuffix(domain);
						const rbody = {};
					
						const newItem: INodeExecutionData = {
							json: {},
							binary: {},
						};
						
						const endpoint = "/susi/domain/availability/" + tld + "/" + domainname + "/" + authsid + "/";
						
						newItem.json = await globedomRequest.call(this, endpoint, rbody, authsid, "GET");
						returnData.push(newItem);												
					}						

					if (domains === 'domain-status') {
						const domain = this.getNodeParameter('domain', itemIndex, '') as string;
						const tld = getPublicSuffix(domain);
						const domainname = getDomainWithoutSuffix(domain);
						
						const rbody = {};
					
						const newItem: INodeExecutionData = {
							json: {},
							binary: {},
						};
						
						const endpoint = "/susi/domain/status/" + tld + "/" + domainname + "/" + authsid + "/";
						
						newItem.json = await globedomRequest.call(this, endpoint, rbody, authsid, "GET");
						returnData.push(newItem);												
					}	

					if (domains === 'domain-delete') {
						const domain = this.getNodeParameter('domain', itemIndex, '') as string;
						const tld = getPublicSuffix(domain);
						const domainname = getDomainWithoutSuffix(domain);
						
						const rbody = {};
					
						const newItem: INodeExecutionData = {
							json: {},
							binary: {},
						};
						
						const endpoint = "/susi/domain/delete/" + tld + "/" + domainname + "/" + authsid + "/";
						
						newItem.json = await globedomRequest.call(this, endpoint, rbody, authsid, "GET");
						returnData.push(newItem);												
					}
										
					if (domains === 'domain-create') {
						const domain = this.getNodeParameter('domain', itemIndex, '') as string;
						const tld = getPublicSuffix(domain);
						const domainname = getDomainWithoutSuffix(domain);
						
						const ownerc = this.getNodeParameter('ownerc', itemIndex, '') as string;
						const billingc = this.getNodeParameter('billingc', itemIndex, '') as string;
						const adminc = this.getNodeParameter('adminc', itemIndex, '') as string;
						const techc = this.getNodeParameter('techc', itemIndex, '') as string;
						const nslist = this.getNodeParameter('nslist', itemIndex, '') as string;
						
						const rbody = {"domain": domain, "owner-c": ownerc, "billing-c": billingc, "admin-c": adminc, "tech-c": techc, "ns-list": nslist};
						
						const newItem: INodeExecutionData = {
							json: {},
							binary: {},
						};
						
						const endpoint = "/susi/domain/create/" + tld + "/" + domainname + "/" + authsid + "/";
						
						newItem.json = await globedomRequest.call(this, endpoint, rbody, authsid, "PUT");
						returnData.push(newItem);												
					}						
				}

				//--------------------------------------------------------
				// 				Contacts
				//--------------------------------------------------------
				if(requests == 'contacts'){
					const contacts = this.getNodeParameter('contacts',  0, '') as string;

					if (contacts === 'contacts-all') {
					
						const rbody = {};
						
						const newItem: INodeExecutionData = {
							json: {},
							binary: {},
						};
						
						const endpoint = "/susi/contact/all/*/*/" + authsid + "/";
						
						newItem.json = await globedomRequest.call(this, endpoint, rbody, authsid, "GET");
						returnData.push(newItem);												
					}	

					if (contacts === 'query-contact-list') {
						const pattern = this.getNodeParameter('pattern', itemIndex, '') as string;
						const tld = this.getNodeParameter('tld', itemIndex, '') as string;
						
						if(tld){
							const rbody = {"pattern" : pattern, "tld": tld, "extended-format" : "1"};
							const newItem: INodeExecutionData = {
								json: {},
								binary: {},
							};
							
							const endpoint = "/susi/domain/all/*/*/" + authsid + "/";
							
							newItem.json = await globedomRequest.call(this, endpoint, rbody, authsid, "GET");
							returnData.push(newItem);								
						} else {
							const rbody = {"pattern" : pattern, "extended-format" : "1"};
							const newItem: INodeExecutionData = {
								json: {},
								binary: {},
							};
							const endpoint = "/susi/domain/all/*/*/" + authsid + "/";
							newItem.json = await globedomRequest.call(this, endpoint, rbody, authsid, "GET");
							returnData.push(newItem);	
						}
						
					}	
					
					if (contacts === 'contact-create') {

						const tld = this.getNodeParameter('tld', itemIndex, '') as string;
						const name = this.getNodeParameter('name', itemIndex, '') as string;
						const fname = this.getNodeParameter('fname', itemIndex, '') as string;
						const lname = this.getNodeParameter('lname', itemIndex, '') as string;
						const organization = this.getNodeParameter('organization', itemIndex, '') as string;
						
						const address1 = this.getNodeParameter('address-1', itemIndex, '') as string;
						const city = this.getNodeParameter('city', itemIndex, '') as string;
						const email = this.getNodeParameter('email', itemIndex, '') as string;
						const postalcode = this.getNodeParameter('postal-code', itemIndex, '') as string;
						const country = this.getNodeParameter('country', itemIndex, '') as string;
						const phone = this.getNodeParameter('phone', itemIndex, '') as string;
						
						if( name ) {
							const rbody = {"tld": tld, "name": name, "organization": organization, "address-1": address1, "city": city, "email": email, "postal-code": postalcode, "country": country, "phone": phone, "lang": "DE"};
							const newItem: INodeExecutionData = {
								json: {},
								binary: {},
							};
							const endpoint = "/susi/domain/all/*/*/" + authsid + "/";
							
							newItem.json = await globedomRequest.call(this, endpoint, rbody, authsid, "GET");
							returnData.push(newItem);
						
						} else {
							const rbody = {"tld": tld, "fname": fname, "lname": lname, "organization": organization, "address-1": address1, "city": city, "email": email, "postal-code": postalcode, "country": country, "phone": phone, "lang": "DE"};
							const newItem: INodeExecutionData = {
								json: {},
								binary: {},
							};
							const endpoint = "/susi/domain/all/*/*/" + authsid + "/";
							
							newItem.json = await globedomRequest.call(this, endpoint, rbody, authsid, "GET");
							returnData.push(newItem);							
						}
																				
					}						
				}
				
				
			} catch (error) {
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