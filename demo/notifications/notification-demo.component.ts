import {Component} from 'angular2/core';
import NotificationEmitter from '../../src/notifications/notification-emitter';
import {Notification} from '../../src/notifications/notification-emitter';
import {AuiNgNotificationComponent} from '../../src/notifications/notification.component';
import {AUI_NG_MESSAGE_TYPE} from '../../src/dialog/message-dialog.component';

@Component({
    directives: [AuiNgNotificationComponent],
    template: require('./notification-demo.component.html')
})
export class NotificationDemoComponent {

    public notificationEmitter: NotificationEmitter<Notification> = new NotificationEmitter(true);
    public notification: Notification;

    createNotification() {
        this.notificationEmitter.subscribe((notification) => {
            this.notification = notification;
        });

        this.notificationEmitter.emit({
            type: AUI_NG_MESSAGE_TYPE.ERROR,
            title: 'foo',
            message: 'bar'
        });
    }

}
