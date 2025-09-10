import { IExecuteFunctions, ILoadOptionsFunctions, IHttpRequestOptions } from 'n8n-workflow';
type HttpMethod = IHttpRequestOptions['method'];
export declare function globedomRequest(this: IExecuteFunctions | ILoadOptionsFunctions, endpoint: string, body: string, authsid: string | undefined, method: HttpMethod): Promise<any>;
export declare function getauthtoken(this: IExecuteFunctions | ILoadOptionsFunctions): Promise<any>;
export declare function tlogout(this: IExecuteFunctions | ILoadOptionsFunctions, authsid: string): Promise<string>;
export {};
