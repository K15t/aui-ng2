import {DynamicComponentLoader, Injectable, ComponentRef, ElementRef} from 'angular2/core';
import AuiNgPortal from './portal.service.ts';
import {Type} from 'angular2/src/facade/lang';

export class Overlay {

    constructor(public ref: ComponentRef, public host) {}

    dispose() {
        this.ref.dispose();
        // remove from DOM
        this.host.outerHTML = '';
    }

}

@Injectable()
export default class AuiNgOverlayService {

    private _container: Element;

    constructor(private _portal: AuiNgPortal) {}

    /**
     * Register a Component as Overlay.
     */
    register(type: Type, origin: ElementRef):Promise<Overlay> {
        if (!this._container) {
            this._createContainer();
        }

        const host = document.createElement('div');
        this._container.appendChild(host);

        return this._portal.port(type, origin, host)
            .then((ref: ComponentRef) => new Overlay(ref, host));
    }

    _createContainer(): void {
        this._container = document.createElement('div');
        this._container.id = 'aui_overlay_container';
        document.body.appendChild(this._container);
    }

}
