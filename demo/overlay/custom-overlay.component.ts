import {Component, Inject, ElementRef} from 'angular2/core';
import {OverlayRef} from '../../src/common/services/overlay.service';
import {AuiNgDialogComponent} from '../../src/dialog/dialog.component';
import AuiNgOverlayService from '../../src/common/services/overlay.service';
import AuiNgPortalService from '../../src/common/services/portal.service';

@Component({
    selector: 'customOverlay',
    directives: [AuiNgDialogComponent],
    providers: [AuiNgOverlayService, AuiNgPortalService],
    template: require('./custom-overlay.component.html')
})
export default class CustomOverlay {

    constructor(public overlay: OverlayRef, private _el: ElementRef, private _overlays: AuiNgOverlayService) {}

    createSubDialog() {
        this._overlays.register(CustomOverlay, this._el, {name: 'Child Dialog!'});
    }

}
