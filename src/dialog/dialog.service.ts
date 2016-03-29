import {Injectable, DynamicComponentLoader, ComponentRef, ElementRef, Inject} from 'angular2/core';
import {Observable} from 'rxjs/Rx';
import {AuiNgMessageDialogComponent} from './message-dialog.component';
import {ConcreteType} from 'angular2/src/facade/lang';
import {LogService} from '../common/services/log.service.ts';
import AuiNgOverlayService from '../common/services/overlay.service';
import {OverlayRef} from '../common/services/overlay.service';

@Injectable()
export class AuiNgDialogService {
    constructor(
        private componentLoader: DynamicComponentLoader,
        private logService: LogService,
        private overlayService: AuiNgOverlayService
    ) {}

    closeDialog() {
    }

    openDialog(componentType: ConcreteType, parentElement: ElementRef, opts?: any): Promise<OverlayRef> {
        return this.overlayService.register(componentType, parentElement, opts)
            .then((overlay) => {
                overlay.host.classList.add('aui-dialog-host');
                return overlay;
            });
    }

    openMessageDialog(title: string, msg: string, type: string, parentElement: ElementRef): Promise<OverlayRef> {
        return this.openDialog(AuiNgMessageDialogComponent, parentElement, {
            title: title,
            message: msg,
            type: type
        });
    }
}
