import {Component, ElementRef} from 'angular2/core';
import AuiNgOverlayService from '../../src/common/services/overlay.service';
import CustomOverlay from './custom-overlay.component';
import {AuiNgDialogService} from '../../src/dialog/index';

@Component({
    selector: 'demoOverlay',
    directives: [],
    providers: [AuiNgOverlayService, AuiNgDialogService],
    template: require('./overlay-demo.component.html')
})
export class OverlayDemoComponent {

    constructor(private _el: ElementRef, private _dialogService: AuiNgDialogService) {}

    createOverlay() {
        this._dialogService.openDialog(CustomOverlay, this._el, {name: 'Foo'}).subscribe();
    }

}
