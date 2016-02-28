import {Injectable, DynamicComponentLoader, ElementRef} from 'angular2/core';
import {Observable, Subject, Subscriber} from 'rxjs/Rx';
import {AuiNgMessageDialogComponent} from './message-dialog.component';
import {AbstractAuiNgAtlassianConnectService} from '../services/atlassian-connect.service';
import {AuiNgDialogOptions} from './dialog-options';
import {AuiNgDialogService} from './dialog.service';

@Injectable()
export class AuiNgConnectDialogService extends AuiNgDialogService {
    constructor(
        private componentLoader: DynamicComponentLoader,
        private atlassianConnectService: AbstractAuiNgAtlassianConnectService
    ) {
        super(componentLoader);
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
