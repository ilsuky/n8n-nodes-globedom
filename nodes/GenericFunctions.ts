import { Parser } from 'xml2js';

import {
  IExecuteFunctions,
  IDataObject,
  ILoadOptionsFunctions,
  IHttpRequestOptions,
  NodeApiError,
} from 'n8n-workflow';

// Utility to normalize the method type used by n8n
type HttpMethod = IHttpRequestOptions['method'];

export async function globedomRequest(
  this: IExecuteFunctions | ILoadOptionsFunctions,
  endpoint: string,
  body: string,
  authsid: string = '',
  method: HttpMethod,
) {
  const credentials = (await this.getCredentials('globedom')) as IDataObject;

  // Build options object and cast to IHttpRequestOptions to satisfy TS.
  // We use `url` (not `uri`) because IHttpRequestOptions expects `url`.
  const options = {
    headers: {
      'content-type': 'text/xml',
    },
    method,
    body,
    url: `${credentials.server}:2109${endpoint}`,
    // `rejectUnauthorized` / `gzip` are not part of the IHttpRequestOptions
    // type in n8n-workflow. If you really need to set a custom agent to
    // ignore TLS errors, you can add one via `agent` (not shown here).
    json: false,
  } as unknown as IHttpRequestOptions;

  const parserOptions = Object.assign({ mergeAttrs: true, trim: true, explicitArray: false });
  const parser = new Parser(parserOptions);

  try {
    // Use the built-in helper request (keeps compatibility with many n8n versions).
    // If your n8n runtime provides `httpRequest` instead, replace `request` with `httpRequest`.
    const response = await (this as IExecuteFunctions).helpers.request!(options);

    // sanitize & parse
    const sanitized = (response as string).replace(/&(?!(?:apos|quot|[gl]t|amp);|#)/g, '&amp;');
    const parsed = await parser.parseStringPromise(sanitized);

    if (parsed.multiresponse) {
      return parsed.multiresponse.response;
    }

    return parsed.response;
  } catch (error: any) {
    throw new NodeApiError(this.getNode(), { error });
  }
}

/**
 * Get a Auth-Token.
 */
export async function getauthtoken(this: IExecuteFunctions | ILoadOptionsFunctions) {
  const credentials = (await this.getCredentials('globedom')) as IDataObject;
  const body: string = `<request><uid>${credentials.uid}</uid><pwd>${credentials.password}</pwd></request>`;

  const options = {
    headers: {
      'content-type': 'text/xml',
    },
    method: 'PUT' as HttpMethod,
    body,
    url: `${credentials.server}:2109/susi/account/login/*/*/*/`,
    json: false,
  } as unknown as IHttpRequestOptions;

  const parserOptions = Object.assign({ mergeAttrs: true, explicitArray: false });
  const parser = new Parser(parserOptions);
  const response = await (this as IExecuteFunctions).helpers.request!(options);
  const parsed = await parser.parseStringPromise(response as string);
  const authsid = parsed.response.token;

  return authsid;
}

/**
 * Logout.
 */
export async function tlogout(this: IExecuteFunctions | ILoadOptionsFunctions, authsid: string) {
  const credentials = (await this.getCredentials('globedom')) as IDataObject;

  const options = {
    headers: {
      'content-type': 'text/xml',
    },
    method: 'GET' as HttpMethod,
    url: `${credentials.server}:2109/susi/account/logout/*/*/${authsid}/`,
    json: false,
  } as unknown as IHttpRequestOptions;

  const parserOptions = Object.assign({ mergeAttrs: true, explicitArray: false });
  const parser = new Parser(parserOptions);
  const response = await (this as IExecuteFunctions).helpers.request!(options);
  await parser.parseStringPromise(response as string);

  return authsid;
}

