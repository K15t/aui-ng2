import {AuiNgRequestProperties} from './request-parameters';

export abstract class AbstractAuiNgAtlassianConnectService {

    getAP() {
        return window['AP'];
    }

    request(requestProperties: AuiNgRequestProperties) {
        this.getAP().require(['request'], request => request(requestProperties));
    }

    close() {
        this.getAP().require('dialog', function (dialog) {
            dialog.close({});
        });
    }

    abstract getBaseUrl();

}
