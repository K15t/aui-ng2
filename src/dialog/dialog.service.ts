import {Injectable, DynamicComponentLoader, ElementRef, ComponentRef} from 'angular2/core';
import {Observable, Subject, Subscriber} from 'rxjs/Rx';
import {AuiNgMessageDialogComponent} from './message-dialog.component';
import {AbstractAuiNgAtlassianConnectService} from '../services/atlassian-connect.service';
import {AuiNgDialogOptions} from './dialog-options';

@Injectable()
export class AuiNgDialogService {

    constructor(
        private componentLoader: DynamicComponentLoader,
        private atlassianConnectService: AbstractAuiNgAtlassianConnectService
    ) {}

    closeDialog() {
        this.atlassianConnectService.getAP().require('dialog', function (dialog) {
            dialog.close({});
        });
    }

    openWebItemInDialog(dialogOptions: AuiNgDialogOptions, callback: Function) {
        this.atlassianConnectService.getAP().require('dialog', function (dialog) {
            dialog.create({
                key: dialogOptions.key,
                size: 'maximum',
                customData: dialogOptions.customData,
                chrome: false
            }).on('close', callback);
        });
    }

    openDialog(type, parentElement: ElementRef, input: any): Observable<any> {
        let observable = Observable.fromPromise(this.componentLoader.loadNextToLocation(type, parentElement));
        observable.map(containerRef => {
            containerRef.instance.init(input, observable, null);
            return containerRef;
        }).subscribe((containerRef) => {
            containerRef.instance.dispose();
        });
        return observable;
    }

    openMessageDialog(msg: string, type: string, parentElement: ElementRef): Observable<any> {
        let observable = <any>Observable.fromPromise(
            this.componentLoader.loadNextToLocation(AuiNgMessageDialogComponent, parentElement));

        observable.subscribe(containerRef => {
                if (!!containerRef.instance.hidden) {
                    containerRef.instance.init(msg, type, containerRef.instance);
                    containerRef.instance.open();
                }
            },
            err => console.log('Error' + err)
        );

        return observable;
    }
}
