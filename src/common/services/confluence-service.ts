import {Observer} from 'rxjs/Rx';

export interface AuiNgConfluenceService {

    getContentEntity(id: string, successCallback: Function, errorCallback: Function): void;

    getAttachment(data: any, successCallback: Function, errorCallback: Function): void;

    getSpaces(successCallback: Function, errorCallback: Function): void;

    getAttachments(contentEntityId: string, successCallback: Function, errorCallback: Function): void;

    searchByCql(cql: string, limit: number, start: number, successCallback: Function, errorCallback: Function): void;

    getMacroDetails(pageId: string, pageVersion: number, macroId: string, successCallback: Function, errorCallback: Function): void;

    getPageId(callback: Observer<any>): void;

    requireConfluence(callback: Observer<any>): void;

    requireDialog(callback: Observer<any>): void;

    requireEvents(callback: Observer<any>): void

    resize(width: string, height: string): void;

}