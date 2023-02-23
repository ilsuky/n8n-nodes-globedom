import {
	IExecuteFunctions,
} from 'n8n-core';
import {
	OptionsWithUri,
} from 'request';

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
		},
		method: 'GET',
		qs,
		uri: `${credentials.server}${endpoint}`,
	};

	const returnr = await this.helpers.request!(options);
	const dataObject:IDataObject = {};
	let list = [];
	const splitData = returnr.split('\n');
	for(let row of splitData){

	  if(row.includes(":")){
		const split = row.split(':');
		dataObject[split[0]] = split[1].trim();
	  }
	  else if(row.length >0 ){
		list.push(row);
	  }
	}
	dataObject.list = list;
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

	const options: IHttpRequestOptions = {
		method: 'PUT',
		headers: {
			'content-type': 'text/xml',
		},		
		body,
		url: `${credentials.server}:2109/susi/account/login/*/*/*/`,
		//@ts-ignore		
		skipSslCertificateValidation: true,
		returnFullResponse: true
	};

	console.log(options);
	const response = await this.helpers.httpRequest(options);
	console.log(response);
	let authsid : string = "";	
	//console.log(authsid);		
	return authsid;

}