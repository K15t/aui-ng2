import {Component, ElementRef, provide} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {AuiNgDialogService, AuiNgMessageType} from '../../src/dialog/index';

@Component({
    selector: 'demoDialog',
    providers: [AuiNgDialogService],
    directives: [...FORM_DIRECTIVES],
    template: require('./dialog-demo.component.html')
})
export class DialogDemoComponent {
    constructor(
        private element: ElementRef,
        private dialogService: AuiNgDialogService
    ) {}

    showDialog(type: string, title: string, msg: string) {
        this.dialogService.openMessageDialog(title, msg, AuiNgMessageType[type], this.element);
    }

}
