/**
 * Options for a request.
 * See: https://developer.atlassian.com/static/connect/docs/latest/javascript/RequestProperties.html.
 */
export interface AuiNgRequestProperties {
    url: string;
    type?: string;
    cache?: boolean;
    data?: string;
    contentType?: string;
    headers?: any;
    success?(response: any): any;
    error?(response: any): any;
}
