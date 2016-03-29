import {Component, Inject} from 'angular2/core';
import {OverlayRef} from '../../src/common/services/overlay.service';

@Component({
    selector: 'customOverlay',
    template: require('./custom-overlay.component.html')
})
export default class CustomOverlay {

    constructor(private _overlay: OverlayRef) {}

    close() {
        this._overlay.dispose();
    }
}
