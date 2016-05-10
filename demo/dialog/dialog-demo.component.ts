import {Component, ViewContainerRef} from '@angular/core';
import {FORM_DIRECTIVES} from '@angular/common';
import {AuiNgDialogService, AUI_NG_MESSAGE_TYPE} from '../../src/dialog/index';
import {AuiNgCodeBlockComponent} from '../common/code-block.component';
import {CustomDialogComponent} from './custom-dialog.component';
import {LogService} from '../../src/common/services/log.service.ts';

@Component({
    selector: 'auiNgDemoDialog',
    providers: [AuiNgDialogService],
    directives: [...FORM_DIRECTIVES, AuiNgCodeBlockComponent],
    template: require('./dialog-demo.component.html')
})
export class DialogDemoComponent {
    constructor(
        private viewContainerRef: ViewContainerRef,
        private dialogService: AuiNgDialogService,
        private logService: LogService
    ) {}

    showDialog(type: string, title: string, msg: string) {
        if (AUI_NG_MESSAGE_TYPE[type] === AUI_NG_MESSAGE_TYPE.ERROR) {
            this.logService.logError('Error ... ');
        } else if (AUI_NG_MESSAGE_TYPE[type] === AUI_NG_MESSAGE_TYPE.INFO) {
            this.logService.logInfo('Info ... ');
        } else if (AUI_NG_MESSAGE_TYPE[type] === AUI_NG_MESSAGE_TYPE.WARN) {
            this.logService.logWarn('Warning ... ');
        } else {
            this.logService.logError('General ... ');
        }
        this.dialogService.openMessageDialog(title, msg, AUI_NG_MESSAGE_TYPE[type], this.viewContainerRef);
    }

    showCustomDialog() {
        this.dialogService.openDialog(CustomDialogComponent, this.viewContainerRef);
    }

}
