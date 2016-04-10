import {Injectable, Inject} from 'angular2/core';
import {Observer} from 'rxjs/Rx';
import {AuiNgConnectService} from './connect.service';

@Injectable()
export class AuiNgConfluenceConnectService {

    constructor(
        @Inject(AuiNgConnectService) private connectService: AuiNgConnectService
    ) {}

    getContentEntity(id: string, successCallback: Function, errorCallback: Function): void {
        this.connectService.getAP().request({
            url: `${this.connectService.getBaseUrl()}/rest/api/content/${id}?expand=version,container,space`,
            success: successCallback,
            error: errorCallback
        });
    }

    getAttachment(data: any, successCallback: Function, errorCallback: Function): void {
        this.connectService.getAP().request({
            contentType: 'application/json',
            type: 'POST',
            url: `{${this.connectService.getBaseUrl()}/rpc/json-rpc/confluenceservice-v2/getAttachmentData`,
            data: JSON.stringify(data),
            success: successCallback,
            error: errorCallback
        });
    }

    getSpaces(successCallback: Function, errorCallback: Function): void {
        this.connectService.getAP().request({
            type: 'POST',
            contentType: 'application/json',
            url: `{${this.connectService.getBaseUrl()}/rpc/json-rpc/confluenceservice-v2/getSpaces`,
            success: successCallback,
            error: errorCallback
        });
    }

    getAttachments(contentEntityId: string, successCallback: Function, errorCallback: Function): void {
        this.connectService.getAP().request({
            url: `{${this.connectService.getBaseUrl()}/rest/api/content/${contentEntityId}/child/attachment?expand=version,container`,
            success: successCallback,
            error: errorCallback
        });
    }

    searchByCql(cql: string, limit: number, start: number, successCallback: Function, errorCallback: Function): void {
        return this.connectService.getAP().request({
            contentType: 'application/json',
            url: `{${this.connectService.getBaseUrl()}/rest/api/content/search?cql=${cql}&limit=${limit}&start=${start}`,
            success: successCallback,
            error: errorCallback
        });
    }

    getMacroDetails(pageId: string, pageVersion: number, macroId: string, successCallback: Function, errorCallback: Function): void {
        this.connectService.getAP().request({
            url: `{${this.connectService.getBaseUrl()}/rest/api/content/${pageId}/history/${pageVersion}/macro/id/${macroId}`,
            success: successCallback,
            error: errorCallback
        });
    }

    getPageId(callback: Observer<any>): void {
        this.connectService.getAP().require('navigator', (navigator) => {
            navigator.getLocation((data) => {
                callback.next(data.context.contentId);
                callback.complete();
            });
        });
    }

    requireConfluence(callback: Observer<any>): void {
        this.connectService.getAP().require('confluence', (confluence) => {
            callback.next(confluence);
            callback.complete();
        });
    }

}
