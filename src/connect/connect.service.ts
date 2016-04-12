import {Injectable, Inject, Optional} from 'angular2/core';
import {Observer} from 'rxjs/Rx';
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

    requireDialog(callback: Observer<any>): void {
        this.getAP().require(["dialog"], (dialog) => {
            callback.next(dialog);
            callback.complete();
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
