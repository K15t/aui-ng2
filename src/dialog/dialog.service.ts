import {Injectable, DynamicComponentLoader, ComponentRef, ElementRef} from 'angular2/core';
import {Observable} from 'rxjs/Rx';
import {AuiNgMessageDialogComponent} from './message-dialog.component';
import {ConcreteType} from 'angular2/src/facade/lang';
import {LogService} from '../services/log.service';

@Injectable()
export class AuiNgDialogService {
    constructor(
        private componentLoader: DynamicComponentLoader,
        private logService: LogService
    ) {}

    closeDialog() {
    }

    openDialog(componentType: ConcreteType, parentElement: ElementRef, opts?: any): Observable<any> {

        let observable = Observable.fromPromise(this.componentLoader.loadNextToLocation(componentType, parentElement));
        observable.subscribe((containerRef: ComponentRef) => {
                if (containerRef.instance.hidden === undefined || !!containerRef.instance.hidden ) {
                    containerRef.instance.init(opts).subscribe(() => {
                        containerRef.dispose();
                    });
                    containerRef.instance.open();
                }
            },
            err => this.logService.logError('Error' + err)
        );

        return observable;
    }

    openMessageDialog(title: string, msg: string, type: string, parentElement: ElementRef): Observable<any> {
        return this.openDialog(AuiNgMessageDialogComponent, parentElement, {
            title: title,
            message: msg,
            type: type
        });
    }
}
