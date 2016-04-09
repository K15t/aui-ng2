import {EventEmitter} from 'angular2/src/facade/async';

export enum Type {
    Generic,
    Error,
    Warning,
    Success,
    Info,
    Hint
};

export interface Notification {
    type: Type;
    title: string;
    message: string;
    details?: string;
};

export default class NotificationEmitter<Notification> extends EventEmitter<Notification> {}
