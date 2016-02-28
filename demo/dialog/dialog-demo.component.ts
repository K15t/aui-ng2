import {Component, ElementRef} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from 'angular2/common';
import {AuiNgDialogService, AuiNgMessageType} from '../../src/dialog/index';
import {AuiNgCodeBlockComponent} from '../common/code-block.component';

@Component({
    selector: 'demoDialog',
    providers: [AuiNgDialogService],
    directives: [...FORM_DIRECTIVES, AuiNgCodeBlockComponent],
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
