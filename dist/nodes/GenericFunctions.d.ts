import { IExecuteFunctions } from 'n8n-core';
import { IDataObject, ILoadOptionsFunctions } from 'n8n-workflow';
export declare function globedomRequest(this: IExecuteFunctions | ILoadOptionsFunctions, endpoint: string, qs: IDataObject | undefined, authsid: string | undefined, method: string): Promise<any>;
export declare function getauthtoken(this: IExecuteFunctions | ILoadOptionsFunctions): Promise<any>;
