import {Component, ComponentRef} from 'angular2/core';
import {AuiNgDialogComponent} from './dialog.component';

@Component({
    selector: 'auiNgMessageDialog',
    directives: [AuiNgDialogComponent],
    styles: [`
        .dialogContainer {
            z-index: 1000;
            position: relative;
            top: 65px;
        }
    `],
    template: `
        <auiNgDialog title="Error ..." [hidden]="hidden" dialogClass="aui-ng-dialog-medium" (dialogClose)="close($event)"
                     dialogContentStyle="max-height: 200px">
            <auiNgDialogContent>
                <div class="aui-message aui-message-{{type}}">{{msg}}</div>
            </auiNgDialogContent>
            <auiNgDialogFooter>
                <button class="aui-button" (click)="close($event)">Close</button>
            </auiNgDialogFooter>
        </auiNgDialog>
    `
})
export class AuiNgMessageDialogComponent {
    hidden: boolean = true;
    msg: string;
    type: string;

    private instance: ComponentRef;

    init(msg: string, type: string, instance: ComponentRef) {
        this.msg = msg;
        this.type = type;
        this.instance = instance;
    }

    open() {
        this.hidden = false;
    }

    close($event) {
        this.hidden = true;
        this.instance.dispose();
    }

}

export const AuiNgMessageType = {
    error: 'error',
    warning: 'warning',
    success: 'success',
    info: 'info',
    hint: 'hint'
};
