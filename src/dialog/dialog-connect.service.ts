import {Injectable, DynamicComponentLoader} from 'angular2/core';
import {AbstractAuiNgAtlassianConnectService} from '../services/atlassian-connect.service';
import {AuiNgDialogOptions} from './dialog-options';
import {AuiNgDialogService} from './dialog.service';
import {LogService} from '../services/log.service';

@Injectable()
export class AuiNgConnectDialogService extends AuiNgDialogService {
    constructor(
        componentLoader: DynamicComponentLoader,
        private atlassianConnectService: AbstractAuiNgAtlassianConnectService,
        logService: LogService
    ) {
        super(componentLoader, logService);
    }

    closeDialog() {
        this.atlassianConnectService.getAP().require('dialog', function (dialog) {
            dialog.close({});
        });
    }

    openWebItemInDialog(dialogOptions: AuiNgDialogOptions, callback: Function) {
        this.atlassianConnectService.getAP().require('dialog', function (dialog) {
            dialog.create({
                key: dialogOptions.key,
                size: 'maximum',
                customData: dialogOptions.customData,
                chrome: false
            }).on('close', callback);
        });
    }

}
