import {Component, Inject, ElementRef} from 'angular2/core';
import {OverlayRef} from '../../src/common/services/overlay.service';
import {AuiNgDialogComponent} from '../../src/dialog/dialog.component';
import AuiNgOverlayService from '../../src/common/services/overlay.service';
import AuiNgPortalService from '../../src/common/services/portal.service';
import {AuiNgDialogService} from '../../src/dialog/index';

@Component({
    selector: 'customOverlay',
    directives: [AuiNgDialogComponent],
    providers: [AuiNgOverlayService, AuiNgPortalService, AuiNgDialogService],
    template: require('./custom-overlay.component.html')
})
export default class CustomOverlay {

    constructor(public overlay: OverlayRef, private _el: ElementRef, private _dialogService: AuiNgDialogService) {}

    createSubDialog() {
        this._dialogService.openDialog(CustomOverlay, this._el, {name: 'Child Dialog!'});
    }

}
