import {Observable, Subject, Subscriber} from 'rxjs/Rx';
import {AuiNgMessageDialogOptions} from './message-dialog.component';

export interface AuiNgDialog {
    open();

    close($event: Event);

    init(opts: AuiNgMessageDialogOptions): Observable<any>;
}