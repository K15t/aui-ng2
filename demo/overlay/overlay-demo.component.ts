import {Component, ElementRef} from 'angular2/core';
import AuiNgOverlayService from '../../src/common/services/overlay.service';
import AuiNgPortalService from '../../src/common/services/portal.service';
import CustomOverlay from './custom-overlay.component';

@Component({
    selector: 'demoOverlay',
    directives: [],
    providers: [AuiNgOverlayService, AuiNgPortalService],
    template: require('./overlay-demo.component.html')
})
export class OverlayDemoComponent {

    constructor(private _el: ElementRef, private _overlays: AuiNgOverlayService) {}

    createOverlay() {
        this._overlays.register(CustomOverlay, this._el);
    }

}
