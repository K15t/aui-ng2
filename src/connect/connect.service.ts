import {Injectable, Inject, Optional} from 'angular2/core';
import {AuiNgRequestProperties} from './request-parameters';
import {BASE_URL} from '../common/constants';

@Injectable()
export class AuiNgConnectService {

    constructor(
        @Optional() @Inject(BASE_URL) private baseUrl?: string
    ) {}

    getAP() {
        return window['AP'];
    }

    executeRequest(requestProperties: AuiNgRequestProperties): void {
        this.getAP().require(['request'], request => request(requestProperties));
    }

    close() {
        this.getAP().require('dialog', function (dialog) {
            dialog.close({});
        });
    }

    getBaseUrl(): string {
        if (this.baseUrl !== undefined && this.baseUrl !== null) {
            return this.baseUrl;
        } else {
            return '';
        }
    }

}
