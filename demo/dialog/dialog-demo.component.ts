import {Component, ElementRef} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {AuiNgDialogService, AUI_NG_MESSAGE_TYPE} from '../../src/dialog/index';
import {AuiNgCodeBlockComponent} from '../common/code-block.component';
import {CustomDialogComponent} from './custom-dialog.component';
import {LogService} from '../../src/common/services/log.service.ts';

@Component({
    selector: 'demoDialog',
    providers: [AuiNgDialogService],
    directives: [...FORM_DIRECTIVES, AuiNgCodeBlockComponent],
    template: require('./dialog-demo.component.html')
})
export class DialogDemoComponent {
    constructor(
        private element: ElementRef,
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
        this.dialogService.openMessageDialog(title, msg, AUI_NG_MESSAGE_TYPE[type], this.element);
    }

    showCustomDialog() {
        this.dialogService.openDialog(CustomDialogComponent, this.element);
    }

}
