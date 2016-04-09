import {Component} from 'angular2/core';
import NotificationEmitter from '../../src/notifications/notification-emitter.ts';
import {Notification, Type} from '../../src/notifications/notification-emitter.ts';

@Component({
    directives: [],
    providers: [],
    template: require('./notification-demo.component.html')
})
export class NotificationDemoComponent {

    private _emitter: NotificationEmitter<Notification>;

    constructor() {
        this._emitter = new NotificationEmitter(true);

        this._emitter.subscribe((notification: Notification) => {
            console.log(notification);
        });
    }

    createNotification() {
        this._emitter.emit({
            type: Type.Error,
            title: 'foo',
            message: 'bar'
        });
    }

}
