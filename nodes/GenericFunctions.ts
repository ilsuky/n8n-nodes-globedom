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
	qs: string,
	authsid: string = '',
	method: string
) {
	
	const credentials = await this.getCredentials('globedom')  as IDataObject;
	const options: OptionsWithUri = {
		headers: {
			'content-type': 'text/xml',
		},
		method,
		qs,
		uri: `${credentials.server}:2109${endpoint}`,
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
	const logout = await tlogout.call(this,authsid);
	
	let rjson;
	
	if(json.multiresponse){
		rjson = json.multiresponse.response;
	} else {
		rjson = json.response;
	}
	
	return rjson;
}

/**
 * Get a Auth-Token.
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

	const parserOptions = Object.assign(
		{
			mergeAttrs: true,
			explicitArray: false,
		}
	);
	const parser = new Parser(parserOptions);
	const response = await this.helpers.request!(options);
	const json = await parser.parseStringPromise(response as string);
	let authsid = json.response.token;
	
	return authsid;
}

/**
 * Logout.
 */
 export async function tlogout (
	this: IExecuteFunctions | ILoadOptionsFunctions,
	authsid: string
) {
	const credentials = await this.getCredentials('globedom') as IDataObject;

	const options: OptionsWithUri = {
		headers: {
			'content-type': 'text/xml',
		},
		method: 'GET',
		uri: `${credentials.server}:2109/susi/account/logout/*/*/${authsid}/`,
		json: false,
		gzip: true,
		rejectUnauthorized: false,
	};

	const parserOptions = Object.assign(
		{
			mergeAttrs: true,
			explicitArray: false,
		}
	);
	const parser = new Parser(parserOptions);
	const response = await this.helpers.request!(options);
	const json = await parser.parseStringPromise(response as string);
	
	return authsid;
}