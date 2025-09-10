import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class globedom implements ICredentialType {
	name = 'globedom';
	documentationUrl = 'https://globedom.internic.at/xml/';
	displayName = 'globedom.com';

	properties: INodeProperties[] = [
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
