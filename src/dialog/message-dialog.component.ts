import {Component} from '@angular/core';
import {AuiNgDialogComponent} from './dialog.component';
import {Observable} from 'rxjs/Rx';
import {Observer} from 'rxjs/Observer';
import {AuiNgDialog} from './dialog';
import {TranslatePipe} from 'ng2-translate/ng2-translate';

@Component({
    selector: 'auiNgMessageDialog',
    directives: [AuiNgDialogComponent],
    template: `
        <auiNgDialog [title]="title" [hidden]="hidden" dialogClass="aui-ng-dialog-medium" (dialogClosed)="onDialogClosed($event)"
                     dialogContentStyle="max-height: 200px">
            <auiNgDialogContent>
                <div class="aui-message aui-message-{{type}}">{{msg}}</div>
            </auiNgDialogContent>
            <auiNgDialogFooter>
                <button class="aui-button" (click)="onDialogClosed($event)">{{'auing.close' | translate}}</button>
            </auiNgDialogFooter>
        </auiNgDialog>
    `,
    pipes: [TranslatePipe]
})
export class AuiNgMessageDialogComponent implements AuiNgDialog {
    hidden: boolean = true;
    title: string;
    msg: string;
    type: string;
    private observer: Observer<any>;

    init(opts: AuiNgMessageDialogOptions): Observable<any> {
        this.title = opts.title;
        this.msg = opts.message;
        this.type = opts.type;
        return Observable.create((observer) => {
            this.observer = observer;
        });
    }

    open() {
        this.hidden = false;
    }

    onDialogClosed($event: Event) {
        $event.preventDefault();
        this.hidden = true;
        this.observer.next(null);
        this.observer.complete();
    }

}

export interface AuiNgMessageDialogOptions {
    title: string;
    message: string;
    type: string;
}

export const AUI_NG_MESSAGE_TYPE = {
    ERROR: 'error',
    WARN: 'warning',
    SUCCESS: 'success',
    INFO: 'info',
    HINT: 'hint'
};
