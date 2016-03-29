import {DynamicComponentLoader, Injectable, Injector, ComponentRef, ElementRef, Provider} from 'angular2/core';
import AuiNgPortal from './portal.service.ts';
import {Type} from 'angular2/src/facade/lang';

export class OverlayRef {

    public ref: ComponentRef;
    public host: any;
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

@Injectable()
export default class AuiNgOverlayService {

    private _container: Element;

    constructor(private _portal: AuiNgPortal) {}

    /**
     * Register a Component as Overlay.
     */
    register(type: Type, origin: ElementRef, options?: any):Promise<OverlayRef> {
        if (!this._container) {
            this._createContainer();
        }

        const host = document.createElement('div');
        this._container.appendChild(host);

        const overlay = new OverlayRef();
        const providers = Injector.resolve([new Provider(OverlayRef, {useValue: overlay})]);

        return this._portal.port(type, origin, host, providers)
            .then((ref: ComponentRef) => {
                overlay.ref = ref;
                overlay.host = host;
                overlay.options = options;

                return overlay;
            });
    }

    _createContainer(): void {
        this._container = document.createElement('div');
        this._container.id = 'aui_overlay_container';
        document.body.appendChild(this._container);
    }

}
