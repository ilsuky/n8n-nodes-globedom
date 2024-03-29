import { IExecuteFunctions } from 'n8n-core';
import { ILoadOptionsFunctions } from 'n8n-workflow';
export declare function globedomRequest(this: IExecuteFunctions | ILoadOptionsFunctions, endpoint: string, body: string, authsid: string | undefined, method: string): Promise<any>;
export declare function getauthtoken(this: IExecuteFunctions | ILoadOptionsFunctions): Promise<any>;
export declare function tlogout(this: IExecuteFunctions | ILoadOptionsFunctions, authsid: string): Promise<string>;
