import {AfterContentInit, Component, ContentChild, ContentChildren, Input, Output, QueryList, EventEmitter} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {AbstractAuiNgAtlassianConnectService} from '../services/atlassian-connect.service';

@Component({
    selector: 'auiNgDialog',
    directives: [...FORM_DIRECTIVES],
    providers: [AbstractAuiNgAtlassianConnectService],
    styles: [require('./dialog.component.css')],
    template: require('./dialog.component.html')
})
export class AuiNgDialogComponent {

    @Input() title: string;

    @Input() dialogClass: string;
    @Input() dialogContentClass: string;
    @Input() dialogStyle: string;
    @Input() dialogContentStyle: string;

    @Input() closeIframeOnClose: boolean;

    @Output() dialogClose: EventEmitter<Event> = new EventEmitter(false);

    constructor(
        private atlassianConnectService: AbstractAuiNgAtlassianConnectService
    ) {}

    close($event: Event) {
        this.dialogClose.emit($event);
        if (!!this.closeIframeOnClose) {
            this.atlassianConnectService.close();
        }
    }

}
