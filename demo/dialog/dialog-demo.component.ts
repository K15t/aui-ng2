import {Component, ElementRef} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from 'angular2/common';
import {AuiNgDialogService, AuiNgMessageType} from '../../src/dialog/index';
import {AuiNgCodeBlockComponent} from '../common/code-block.component';
import {CustomDialogComponent} from './custom-dialog.component';
import {LogService} from '../../src/services/log.service';

@Component({
    selector: 'demoDialog',
    providers: [AuiNgDialogService, LogService],
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
        if (AuiNgMessageType[type] === AuiNgMessageType.ERROR) {
            this.logService.logError("Error ... ");
        } else if (AuiNgMessageType[type] === AuiNgMessageType.INFO) {
            this.logService.logInfo("Info ... ");
        } else if (AuiNgMessageType[type] === AuiNgMessageType.WARN) {
            this.logService.logWarn("Warning ... ");
        } else {
            this.logService.logError("General ... ");
        }
        this.dialogService.openMessageDialog(title, msg, AuiNgMessageType[type], this.element);
    }

    showCustomDialog() {
        this.dialogService.openDialog(CustomDialogComponent, this.element);
    }

}
