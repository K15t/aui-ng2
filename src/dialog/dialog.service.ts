import {Injectable, DynamicComponentLoader, ComponentRef, ViewContainerRef} from 'angular2/core';
import {Observable} from 'rxjs/Rx';
import {AuiNgMessageDialogComponent} from './message-dialog.component';
import {ConcreteType} from 'angular2/src/facade/lang';
import {LogService} from '../common/services/log.service.ts';

@Injectable()
export class AuiNgDialogService {
    constructor(
        private componentLoader: DynamicComponentLoader,
        private logService: LogService
    ) {}

    closeDialog() {
    }

    openDialog(componentType: ConcreteType, viewContainerRef: ViewContainerRef, opts?: any): Observable<any> {
        let observable = Observable.fromPromise(this.componentLoader.loadNextToLocation(componentType, viewContainerRef));

        observable.subscribe((containerRef: ComponentRef) => {
                if (containerRef.instance.hidden === undefined || !!containerRef.instance.hidden) {
                    containerRef.instance.init(opts).subscribe(() => {
                        containerRef.destroy();
                    });
                    containerRef.instance.open();
                }
            },
            err => this.logService.logError('Error' + err)
        );

        return observable;
    }

    openMessageDialog(title: string, msg: string, type: string, viewContainerRef: ViewContainerRef): Observable<any> {
        return this.openDialog(AuiNgMessageDialogComponent, viewContainerRef, {
            title: title,
            message: msg,
            type: type
        });
    }
}
