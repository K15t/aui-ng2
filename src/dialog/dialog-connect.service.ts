import {Injectable, DynamicComponentLoader} from '@angular/core';
import {AuiNgConnectService} from '../connect/connect.service';
import {AuiNgDialogOptions} from './dialog-options';
import {AuiNgDialogService} from './dialog.service';
import {LogService} from '../common/services/log.service.ts';

@Injectable()
export class AuiNgConnectDialogService extends AuiNgDialogService {
    constructor(
        componentLoader: DynamicComponentLoader,
        private connectService: AuiNgConnectService,
        logService: LogService
    ) {
        super(componentLoader, logService);
    }

    closeDialog() {
        this.connectService.getAP().require('dialog', function (dialog) {
            dialog.close({});
        });
    }

    openWebItemInDialog(dialogOptions: AuiNgDialogOptions, callback: Function) {
        this.connectService.getAP().require('dialog', function (dialog) {
            dialog.create({
                key: dialogOptions.key,
                size: 'maximum',
                customData: dialogOptions.customData,
                chrome: false
            }).on('close', callback);
        });
    }

}
