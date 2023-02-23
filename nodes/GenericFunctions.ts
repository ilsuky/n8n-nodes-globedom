import {
	IExecuteFunctions,
} from 'n8n-core';
import {
	OptionsWithUri,
} from 'request';

import axios from 'axios';

import {
	IDataObject,
	ILoadOptionsFunctions
} from 'n8n-workflow';


export async function globedomRequest (
	this: IExecuteFunctions | ILoadOptionsFunctions,
	endpoint: string,
	qs: IDataObject = {},
	authsid: string = ''
) {
	
	const credentials = await this.getCredentials('globedom')  as IDataObject;

	return credentials;
}

/**
 * Get a Auth-Sid.
 */
 export async function getauthtoken (
	this: IExecuteFunctions | ILoadOptionsFunctions,
) {
	
	
	
	const credentials = await this.getCredentials('globedom') as IDataObject;
	const body : string = `<request><uid>${credentials.uid}</uid><pwd>${credentials.password}</pwd></request>`;

    const { data } = await axios.put(
      `${credentials.server}:2109/susi/account/login/*/*/*/`,
      { body },
      {
        headers: {
          'Content-Type': 'text/xml'
        },
      },
    );

    console.log(JSON.stringify(data, null, 4));

	let authsid : string = "";	
	//console.log(authsid);		
	return authsid;

}