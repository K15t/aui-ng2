import {Observable} from 'rxjs/Rx';
import {AuiNgMessageDialogOptions} from './message-dialog.component';

export interface AuiNgDialog {

    /**
     * Opens the dialog.
     */
    open(): void;

    /**
     * Event emitted if the the dialog was closed by clicking on the 'X' icon or by a programmatically emitted event.
     */
    onDialogClosed($event: Event): void;

    /**
     * Called on opening the dialog for customized initialization.
     *
     * @param opts Additional dialog options
     * @return Observable to notify opener of the dialog e.g. if the dialog was closed or exchanging information
     */
    init(opts: AuiNgMessageDialogOptions): Observable<any>;
}