import {Component, Input, Output, EventEmitter, Optional, HostListener} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {DialogUpdateEvent} from './dialog-update.event';
import '../common/libs/aui-styles';

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

    @Output() dialogClose: EventEmitter<Event> = new EventEmitter(false);

    close($event: Event) {
        this.dialogClose.emit($event);
    }

    @HostListener('window:keydown', ['$event']) onKeydown(event: KeyboardEvent) {
        // close on keydown escape
        if (event.keyCode === 27) {
            this.close(event);
        }


    }

    private updateDialog($event: CustomEvent) {

        let data: DialogUpdateEvent = $event.detail;

        if (data.title) {
            this.title = data.title;
        }

        if (data.showXIcon !== undefined) {
            this.showXIcon = data.showXIcon.toString();
        }

        if (data.toAll !== undefined && !data.toAll) {
            $event.preventDefault();
        }

        if (data.dialogClass) {
            this.dialogClass = data.dialogClass;
        }

        if (data.dialogContentClass) {
            this.dialogContentClass = data.dialogContentClass;
        }

        if (data.dialogContentStyle) {
            this.dialogContentStyle = data.dialogContentStyle;
        }

        if (data.dialogStyle) {
            this.dialogStyle = data.dialogStyle;
        }
    }

}
