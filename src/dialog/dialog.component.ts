import {Component, Input, Output, EventEmitter, HostListener} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {AuiNgDialogUpdateEvent} from './dialog-update.event';

@Component({
    selector: 'auiNgDialog',
    directives: [...FORM_DIRECTIVES],
    styles: [require('./dialog.component.css')],
    template: require('./dialog.component.html')
})
export class AuiNgDialogComponent {

    @Input() title: string;
    @Input() dialogClass: string;
    @Input() dialogContentClass: string;
    @Input() dialogStyle: string;
    @Input() dialogContentStyle: string;
    @Input() showXIcon: string = 'true';
    @Input() showBlanket: string = 'true';

    @Output() dialogClosed: EventEmitter<Event> = new EventEmitter<Event>(false);

    onDialogClose($event: Event) {
        $event.preventDefault();
        this.dialogClosed.emit($event);
    }

    @HostListener('window:keydown', ['$event']) onKeydown(event: KeyboardEvent) {
        // close on keydown escape
        if (event.keyCode === 27) {
            this.onDialogClose(event);
        }
    }

    onDialogUpdate($event: CustomEvent) {
        this.updateDialog($event.detail);
        if ($event.detail.toAll !== undefined && !$event.detail.toAll) {
            $event.preventDefault();
        }
    }

    updateDialog(update: AuiNgDialogUpdateEvent) {

        if (update.title) {
            this.title = update.title;
        }

        if (update.showXIcon !== undefined) {
            this.showXIcon = update.showXIcon.toString();
        }

        if (update.dialogClass) {
            this.dialogClass = update.dialogClass;
        }

        if (update.dialogContentClass) {
            this.dialogContentClass = update.dialogContentClass;
        }

        if (update.dialogContentStyle) {
            this.dialogContentStyle = update.dialogContentStyle;
        }

        if (update.dialogStyle) {
            this.dialogStyle = update.dialogStyle;
        }
    }

}
