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
						name: 'Transfer',
						value: 'domain-transfer',
					},
					{
						name: 'Transfer-List',
						value: 'domain-transferlist',
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
						value: 'contact-create',
					},				
					{
						name: 'Info',
						value: 'contact-info',
					},
					{
						name: 'Update',
						value: 'contact-update',
					},
					{
						name: 'Show All',
						value: 'contacts-all',
					},	
					{
						name: 'Get associated domains',
						value: 'getassociated',
					},						
				],
				default: 'contact-create',
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
						name: 'Delete',
						value: 'nameservers-delete',
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
							'domain-transfer',						
							'domain-transferlist',						
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
							'domain-transfer',							
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
							'domain-transfer',						
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
							'domain-transfer',							
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
							'domain-transfer',							
						],					
					},
				},
				default: '',
				required: true,
				description: 'Technical contact handle',
			},
			{
				displayName: 'Auth-code',
				name: 'authcode',
				type: 'string',
				displayOptions: {
					show: {
						requests:[
							'domains',
						],						
						domains:[
							'domain-transfer',							
						],					
					},
				},
				default: '',
				required: true,
				description: 'Auth-Code by previous Provider',
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
							'domain-transfer',						
						],					
					},
				},
				default: 'ns1.cnh.at,ns2.cnh.at,ns3.cnh.at',
				required: true,
				description: 'List of name servers, delimited by colon',
			},
////// Contact
			{
				displayName: 'contact-handle',
				name: 'contacthandle',
				type: 'string',
				displayOptions: {
					show: {
						requests:[
							'contacts',
						],						
						contacts:[
							'contact-info',
							'contact-update',
							'getassociated',
						],					
					},
				},
				default: '',
				required: false,
				description: '',
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
							'contact-update',
						],					
					},
				},
				default: '',
				required: true,
				description: 'email',
			},		
			{
				displayName: 'address',
				name: 'address',
				type: 'string',
				displayOptions: {
					show: {
						requests:[
							'contacts',
						],						
						contacts:[
							'contact-create',
							'contact-update',
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
							'contact-update',
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
							'contact-update',
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
							'contact-update',
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
							'contact-update',
						],					
					},
				},
				default: '+43.',
				required: true,
				description: 'phone ex. +43.5223.5855',
			},
////// Nameservers
			{
				displayName: 'hostname',
				name: 'hostname',
				type: 'string',
				displayOptions: {
					show: {
						requests:[
							'nameservers',
						],						
						nameservers:[
							'nameservers-create',
							'nameservers-delete',
						],					
					},
				},
				default: '',
				required: true,
				description: 'domainname like ns1.globedom.com',
			},	
			{
				displayName: 'ipv4',
				name: 'ipv4',
				type: 'string',
				displayOptions: {
					show: {
						requests:[
							'nameservers',
						],						
						nameservers:[
							'nameservers-create',
						],					
					},
				},
				default: '',
				required: true,
				description: 'ex. 1.2.3.4',
			},	
			{
				displayName: 'ipv6',
				name: 'ipv6',
				type: 'string',
				displayOptions: {
					show: {
						requests:[
							'nameservers',
						],						
						nameservers:[
							'nameservers-create',
						],					
					},
				},
				default: '',
				required: false,
				description: 'ex. 4100:2100::11',
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
					
						const rbody = "";
						
						const endpoint = "/susi/domain/all/*/*/" + authsid + "/";
						
						const response = await globedomRequest.call(this, endpoint, rbody, authsid, "GET");

						for(let dataIndex = 0; dataIndex<response.length;dataIndex++){
							const newItem: INodeExecutionData = {
								json: {},
								binary: {},
							};
							newItem.json = response[dataIndex];
							returnData.push(newItem);
						}
						
					}	
					
					if (domains === 'domain-check') {
						const domain = this.getNodeParameter('domain', itemIndex, '') as string;
						const tld = getPublicSuffix(domain);
						const domainname = getDomainWithoutSuffix(domain);
						const rbody = "";
					
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
						
						const rbody = "";
					
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
						
						const rbody = "";
					
						const newItem: INodeExecutionData = {
							json: {},
							binary: {},
						};
						
						const endpoint = "/susi/domain/delete/" + tld + "/" + domainname + "/" + authsid + "/";
						
						newItem.json = await globedomRequest.call(this, endpoint, rbody, authsid, "GET");
						returnData.push(newItem);												
					}

					if (domains === 'domain-transferlist') {
						const domain = this.getNodeParameter('domain', itemIndex, '') as string;
						const tld = getPublicSuffix(domain);
						const domainname = getDomainWithoutSuffix(domain);
						
						const rbody = "<request><wildcard>" + domainname + "</wildcard></request>";
					
						const newItem: INodeExecutionData = {
							json: {},
							binary: {},
						};
						
						const endpoint = "/susi/domain/transferlist/*/*/" + authsid + "/";
						
						newItem.json = await globedomRequest.call(this, endpoint, rbody, authsid, "PUT");
						returnData.push(newItem);												
					}
					
					if (domains === 'domain-transfer') {
						const domain = this.getNodeParameter('domain', itemIndex, '') as string;
						const tld = getPublicSuffix(domain);
						const domainname = getDomainWithoutSuffix(domain);
						
						const ownerc = this.getNodeParameter('ownerc', itemIndex, '') as string;
						const billingc = this.getNodeParameter('billingc', itemIndex, '') as string;
						const adminc = this.getNodeParameter('adminc', itemIndex, '') as string;
						const techc = this.getNodeParameter('techc', itemIndex, '') as string;
						const nslist = this.getNodeParameter('nslist', itemIndex, '') as string;
						const authcode = this.getNodeParameter('authcode', itemIndex, '') as string;
						
						var res = nslist.split(',');
						var nslistout = "";
						for (let itemIndex2 = 0; itemIndex2 < res.length; itemIndex2++) {
								nslistout += "<hostname>" + res[itemIndex2] + "</hostname>";
						}
						
						const rbody = "<request><owner>" + ownerc + "</owner><tech>" + techc + "</tech><admin>" + adminc + "</admin><billing>" + billingc + "</billing><password>" + authcode + "</password><nameservers>" + nslistout + "</nameservers></request>";
						
						//console.log(rbody);
						
						const newItem: INodeExecutionData = {
							json: {},
							binary: {},
						};
						
						const endpoint = "/susi/domain/transfer/" + tld + "/" + domainname + "/" + authsid + "/";
						
						newItem.json = await globedomRequest.call(this, endpoint, rbody, authsid, "PUT");
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
						
						var res = nslist.split(',');
						var nslistout = "";
						for (let itemIndex2 = 0; itemIndex2 < res.length; itemIndex2++) {
								nslistout += "<hostname>" + res[itemIndex2] + "</hostname>";
						}
						
						const rbody = "<request><owner>" + ownerc + "</owner><tech>" + techc + "</tech><admin>" + adminc + "</admin><billing>" + billingc + "</billing><nameservers>" + nslistout + "</nameservers></request>";
						
						const newItem: INodeExecutionData = {
							json: {},
							binary: {},
						};
						
						const endpoint = "/susi/domain/create/" + tld + "/" + domainname + "/" + authsid + "/";
						
						newItem.json = await globedomRequest.call(this, endpoint, rbody, authsid, "PUT");
						returnData.push(newItem);												
					}

					if (domains === 'domain-update') {
						const domain = this.getNodeParameter('domain', itemIndex, '') as string;
						const tld = getPublicSuffix(domain);
						const domainname = getDomainWithoutSuffix(domain);
						
						const ownerc = this.getNodeParameter('ownerc', itemIndex, '') as string;
						const billingc = this.getNodeParameter('billingc', itemIndex, '') as string;
						const adminc = this.getNodeParameter('adminc', itemIndex, '') as string;
						const techc = this.getNodeParameter('techc', itemIndex, '') as string;
						const nslist = this.getNodeParameter('nslist', itemIndex, '') as string;
						
						var res = nslist.split(',');
						var nslistout = "";
						for (let itemIndex2 = 0; itemIndex2 < res.length; itemIndex2++) {
								nslistout += "<hostname>" + res[itemIndex2] + "</hostname>";
						}
						
						const rbody = "<request><owner>" + ownerc + "</owner><tech>" + techc + "</tech><admin>" + adminc + "</admin><billing>" + billingc + "</billing><nameservers>" + nslistout + "</nameservers></request>";
						
						const newItem: INodeExecutionData = {
							json: {},
							binary: {},
						};
						
						const endpoint = "/susi/domain/update/" + tld + "/" + domainname + "/" + authsid + "/";
						
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
					
						const rbody = "";
						
						const endpoint = "/susi/contact/all/*/*/" + authsid + "/";
						
						console.log('Check all Contacts');
						
						const response = await globedomRequest.call(this, endpoint, rbody, authsid, "GET");

						for(let dataIndex = 0; dataIndex<response.length;dataIndex++){
							const newItem: INodeExecutionData = {
								json: {},
								binary: {},
							};
							newItem.json = response[dataIndex];
							returnData.push(newItem);
						}												
					}	

					if (contacts === 'getassociated') {
						
						const contacthandle = this.getNodeParameter('contacthandle', itemIndex, '') as string;
						const rbody = "";
						
						const newItem: INodeExecutionData = {
							json: {},
							binary: {},
						};
						
						const endpoint = "/susi/contact/getassociated/" + contacthandle + "/*/" + authsid + "/";
						
						newItem.json = await globedomRequest.call(this, endpoint, rbody, authsid, "GET");
						returnData.push(newItem);												
					}


					if (contacts === 'contact-info') {
						
						const contacthandle = this.getNodeParameter('contacthandle', itemIndex, '') as string;
						const rbody = "";
						
						const newItem: INodeExecutionData = {
							json: {},
							binary: {},
						};
						
						const endpoint = "/susi/contact/info/" + contacthandle + "/*/" + authsid + "/";
						
						newItem.json = await globedomRequest.call(this, endpoint, rbody, authsid, "GET");
						returnData.push(newItem);												
					}					

					
					if (contacts === 'contact-create') {

						const fname = this.getNodeParameter('fname', itemIndex, '') as string;
						const lname = this.getNodeParameter('lname', itemIndex, '') as string;
						const organization = this.getNodeParameter('organization', itemIndex, '') as string;
						
						const address = this.getNodeParameter('address', itemIndex, '') as string;
						const city = this.getNodeParameter('city', itemIndex, '') as string;
						const email = this.getNodeParameter('email', itemIndex, '') as string;
						const postalcode = this.getNodeParameter('postal-code', itemIndex, '') as string;
						const country = this.getNodeParameter('country', itemIndex, '') as string;
						const phone = this.getNodeParameter('phone', itemIndex, '') as string;
						
						const newItem: INodeExecutionData = {
							json: {},
							binary: {},
						};
						const endpoint = "/susi/contact/create/*/*/" + authsid + "/";
						const rbody = "<request><type>PERS</type><firstname>" + fname + "</firstname><lastname>" + lname + "</lastname><organization>" + organization + "</organization><address>" + address + "</address><pc>" + postalcode + "</pc><city>" + city + "</city><country>" + country + "</country><phone>" + phone + "</phone><email>" + email + "</email></request>";
						
						newItem.json = await globedomRequest.call(this, endpoint, rbody, authsid, "PUT");
						returnData.push(newItem);
																				
					}	

					if (contacts === 'contact-update') {
					
						const contacthandle = this.getNodeParameter('contacthandle', itemIndex, '') as string;
						const address = this.getNodeParameter('address', itemIndex, '') as string;
						const city = this.getNodeParameter('city', itemIndex, '') as string;
						const email = this.getNodeParameter('email', itemIndex, '') as string;
						const postalcode = this.getNodeParameter('postal-code', itemIndex, '') as string;
						const country = this.getNodeParameter('country', itemIndex, '') as string;
						const phone = this.getNodeParameter('phone', itemIndex, '') as string;
						
						
						const newItem: INodeExecutionData = {
							json: {},
							binary: {},
						};
						const endpoint = "/susi/contact/update/" + contacthandle + "/*/" + authsid + "/";
						const rbody = "<request><address>" + address + "</address><pc>" + postalcode + "</pc><city>" + city + "</city><country>" + country + "</country><phone>" + phone + "</phone><email>" + email + "</email></request>";
						
						newItem.json = await globedomRequest.call(this, endpoint, rbody, authsid, "PUT");
						returnData.push(newItem);
																				
					}
				}
				//--------------------------------------------------------
				// 				Nameservers
				//--------------------------------------------------------					
				if(requests == 'nameservers'){
					const nameservers = this.getNodeParameter('nameservers',  0, '') as string;
					
					if (nameservers === 'nameservers-all') {
						const rbody = "";
						
						const endpoint = "/susi/nameserver/all/*/*/" + authsid + "/";
						
						const response = await globedomRequest.call(this, endpoint, rbody, authsid, "GET");
						for(let dataIndex = 0; dataIndex<response.length;dataIndex++){
							const newItem: INodeExecutionData = {
								json: {},
								binary: {},
							};
							newItem.json = response[dataIndex];
							returnData.push(newItem);
						}	
					}
					
					if (nameservers === 'nameservers-delete') {
						
						const hostname = this.getNodeParameter('hostname', itemIndex, '') as string;
						
						const rbody = "";
						
						const newItem: INodeExecutionData = {
							json: {},
							binary: {},
						};
						
						const endpoint = "/susi/nameserver/delete/" + hostname + "/*/" + authsid + "/";
						
						newItem.json = await globedomRequest.call(this, endpoint, rbody, authsid, "GET");
						returnData.push(newItem);
					}
					
					if (nameservers === 'nameservers-create') {
						
						const hostname = this.getNodeParameter('hostname', itemIndex, '') as string;
						const ipv4 = this.getNodeParameter('ipv4', itemIndex, '') as string;
						const ipv6 = this.getNodeParameter('ipv6', itemIndex, '') as string;
						
						const rbody = "<request><hostname>" + hostname + "</hostname><ip>" + ipv4 + "</ip><ipv6>" + ipv6 + "</ipv6></request>";
						
						const newItem: INodeExecutionData = {
							json: {},
							binary: {},
						};
						
						const endpoint = "/susi/nameserver/create/*/*/" + authsid + "/";
						
						newItem.json = await globedomRequest.call(this, endpoint, rbody, authsid, "PUT");
						returnData.push(newItem);
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