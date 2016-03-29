import {DynamicComponentLoader, Injectable, Injector, ComponentRef, ElementRef, Provider} from 'angular2/core';
import AuiNgPortal from './portal.service.ts';
import {Type} from 'angular2/src/facade/lang';
import {Observable} from 'rxjs/Rx';

@Injectable()
export default class AuiNgOverlayService {

    constructor(private _portal: AuiNgPortal) {}

    /**
     * Register a Component as Overlay.
     */
    register(type: Type, origin: ElementRef, options?: any):Observable<OverlayRef> {
        const host = document.createElement('div');
        this._getContainer().appendChild(host);

        const overlay = new OverlayRef();
        const providers = Injector.resolve([new Provider(OverlayRef, {useValue: overlay})]);

        return this._portal.port(type, origin, host, providers)
            .map((ref: ComponentRef) => {
                overlay.ref = ref;
                overlay.host = host;
                overlay.options = options;

                return overlay;
            });
    }

    _getContainer(): HTMLElement {
        const containerId = 'aui-overlay-container';
        let container = document.getElementById(containerId);

        if (container) {
            return container;
        }

        container = document.createElement('div');
        container.id = containerId;
        document.body.appendChild(container);

        return container;
    }

}

export class OverlayRef {

    public ref: ComponentRef;
    public host: HTMLElement;
    public options: any;

    show() {
        this.host.style.display = 'block';
    }

    hide() {
        this.host.style.display = 'none';
    }

    isHidden() {
        return this.host.style.display === 'none';
    }

    remove() {
        this.ref.dispose();
        // remove from DOM
        this.host.outerHTML = '';
    }

}
