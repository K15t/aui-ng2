import {DynamicComponentLoader, Injectable, Injector, ComponentRef, ElementRef, Provider, ResolvedProvider} from 'angular2/core';
import {Type} from 'angular2/src/facade/lang';
import {Observable} from 'rxjs/Rx';

@Injectable()
export default class AuiNgOverlayService {

    constructor(private componentLoader: DynamicComponentLoader) {}

    /**
     * Register a Component as Overlay.
     */
    register(type: Type, origin: ElementRef, options?: any):Observable<OverlayRef> {
        const host = document.createElement('div');
        this._getContainer().appendChild(host);

        const overlay = new OverlayRef();
        const providers = Injector.resolve([new Provider(OverlayRef, {useValue: overlay})]);

        return Observable.create(observer => {
            this.componentLoader.loadNextToLocation(type, origin, providers).then(ref => {
                // this is where the magic happens:
                // moves the DOM node to a new location (can also be outside of
                // the angular app context)
                host.appendChild(ref.hostView.rootNodes[0]);

                overlay.ref = ref;
                overlay.host = host;
                overlay.options = options;

                observer.next(overlay);
                observer.complete();
            });
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

    show():void {
        this.host.style.display = 'block';
    }

    hide():void {
        this.host.style.display = 'none';
    }

    isHidden():boolean {
        return this.host.style.display === 'none';
    }

    remove():void {
        this.ref.dispose();
        // remove from DOM
        this.host.outerHTML = '';
    }

}
