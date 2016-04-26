import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {AuiNgDialog} from '../../src/dialog/dialog';
import {AuiNgMessageDialogOptions} from '../../src/dialog/message-dialog.component';
import {Observable} from 'rxjs/Rx';
import {Observer} from 'rxjs/Observer';
import {AuiNgDialogComponent} from '../../src/dialog/dialog.component';

@Component({
    selector: 'auiNgCustomDialog',
    directives: [...FORM_DIRECTIVES, AuiNgDialogComponent],
    template: require('./custom-dialog.component.html')
})
export class CustomDialogComponent implements AuiNgDialog {
    name: string;
    private observer: Observer<any>;

    open() {
    }

    onDialogClosed($event: Event) {
        $event.preventDefault();
        this.observer.next(null);
        this.observer.complete();
    }

    init(opts: AuiNgMessageDialogOptions): Observable<any> {
        return Observable.create((observer) => {
            this.observer = observer;
        });
    }

}
