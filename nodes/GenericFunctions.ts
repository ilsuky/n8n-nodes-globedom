import {
	IExecuteFunctions,
} from 'n8n-core';
import {
	OptionsWithUri,
} from 'request';

import { 
	Builder,
	Parser 
} from 'xml2js';

import {
	IDataObject,
	ILoadOptionsFunctions,
	IHttpRequestOptions
} from 'n8n-workflow';

export async function globedomRequest (
	this: IExecuteFunctions | ILoadOptionsFunctions,
	endpoint: string,
	qs: IDataObject = {},
	authsid: string = ''
) {
	
	const credentials = await this.getCredentials('globedom')  as IDataObject;
	const options: OptionsWithUri = {
		headers: {
			'content-type': 'text/xml',
		},
		method: 'GET',
		qs,
		uri: `${credentials.server}${endpoint}`,
		rejectUnauthorized: false,
	};

	const returnr = await this.helpers.request!(options);
	const dataObject:IDataObject = {};
	return dataObject;
}

/**
 * Get a Auth-Sid.
 */
 export async function getauthtoken (
	this: IExecuteFunctions | ILoadOptionsFunctions,
) {
	const credentials = await this.getCredentials('globedom') as IDataObject;
	const body : string = `<request><uid>${credentials.uid}</uid><pwd>${credentials.password}</pwd></request>`;

	const options: OptionsWithUri = {
		headers: {
			'content-type': 'text/xml',
		},
		method: 'PUT',
		body,
		uri: `${credentials.server}:2109/susi/account/login/*/*/*/`,
		json: false,
		gzip: true,
		rejectUnauthorized: false,
	};

	console.log(options);
	
	const parserOptions = Object.assign(
		{
			mergeAttrs: true,
			explicitArray: false,
		}
	);
	const parser = new Parser(parserOptions);
	
	const response = await this.helpers.request!(options);
	
	const json = await parser.parseStringPromise(response as string);
	
	console.log(json);
	let authsid : string = "";	
	//console.log(authsid);		
	return authsid;
}