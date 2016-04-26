import {Component, Inject, ElementRef} from 'angular2/core';
import {OverlayRef} from '../../src/common/services/overlay.service';
import {AuiNgDialogComponent} from '../../src/dialog/dialog.component';
import AuiNgOverlayService from '../../src/common/services/overlay.service';
import {AuiNgDialogService} from '../../src/dialog/index';

@Component({
    selector: 'customOverlay',
    directives: [AuiNgDialogComponent],
    providers: [AuiNgOverlayService, AuiNgDialogService],
    template: require('./custom-overlay.component.html')
})
export default class CustomOverlay {

    constructor(public overlay: OverlayRef, private el: ElementRef, private dialogService: AuiNgDialogService) {}

    createSubDialog() {
        this.dialogService.openDialog(CustomOverlay, this.el, {name: 'Child Dialog!'}).subscribe();
    }

}
