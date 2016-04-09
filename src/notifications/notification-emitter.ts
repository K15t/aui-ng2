import {EventEmitter} from 'angular2/src/facade/async';

export interface Notification {
    type: string;
    title: string;
    message: string;
    ns?: string;
    details?: string;
};

export default class NotificationEmitter<Notification> extends EventEmitter<Notification> {}
