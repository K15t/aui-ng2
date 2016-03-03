import {Component, Input, Output, EventEmitter, Optional, HostListener} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';

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

}
