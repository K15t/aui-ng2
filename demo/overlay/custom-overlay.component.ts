import {Component, Inject} from 'angular2/core';
import {OverlayRef} from '../../src/common/services/overlay.service';
import {AuiNgDialogComponent} from '../../src/dialog/dialog.component';

@Component({
    selector: 'customOverlay',
    directives: [AuiNgDialogComponent],
    template: require('./custom-overlay.component.html')
})
export default class CustomOverlay {

    constructor(public overlay: OverlayRef) {}

}
