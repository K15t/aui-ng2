import {Component, ComponentRef} from 'angular2/core';
import {AuiNgDialogComponent} from './dialog.component';
import {Observable, Subject, Subscriber} from 'rxjs/Rx';
import {Observer} from 'rxjs/Observer';
import {AuiNgDialog} from './dialog';

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
        <auiNgDialog [title]="title" [hidden]="hidden" dialogClass="aui-ng-dialog-medium" (dialogClose)="close($event)"
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
export class AuiNgMessageDialogComponent implements AuiNgDialog {
    hidden: boolean = true;
    title: string;
    msg: string;
    type: string;
    observer: Observer<any>;

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

    close($event: Event) {
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

export const AuiNgMessageType = {
    ERROR: 'error',
    WARN: 'warning',
    SUCCESS: 'success',
    INFO: 'info',
    HINT: 'hint'
};
