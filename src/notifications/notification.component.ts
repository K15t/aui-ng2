import {Component, Input} from 'angular2/core';
import {Notification} from './notification-emitter';

@Component({
    selector: 'auiNgNotification',
    template: require('./notification.component.html')
})
export class AuiNgNotificationComponent {

    @Input() notification: Notification;
    @Input() closeable: boolean = false;

    public clear():void {
        this.notification = null;
    }

}
