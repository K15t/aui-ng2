import {provide, enableProdMode} from 'angular2/core';
import {bootstrap, ELEMENT_PROBE_PROVIDERS} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {TRANSLATE_PROVIDERS} from 'ng2-translate/ng2-translate';
import {AppComponent} from './app.component';
import {LogService} from '../src/common/services/log.service.ts';
import AuiNgOverlayService from '../src/common/services/overlay.service';
import AuiNgPortal from '../src/common/services/portal.service';
import {IS_DEV_MODE} from './constants';

document.addEventListener('DOMContentLoaded', function main() {
    bootstrap(AppComponent, [
        provide(IS_DEV_MODE, {useValue: process.env.ENV === 'development'}),
        ...('production' === process.env.ENV ? [] : ELEMENT_PROBE_PROVIDERS),
        ...HTTP_PROVIDERS,
        ...ROUTER_PROVIDERS,
        ...TRANSLATE_PROVIDERS,
        provide(LocationStrategy, {useClass: HashLocationStrategy}),
        LogService,
        AuiNgOverlayService,
        AuiNgPortal
    ]);
});

if ('production' === process.env.ENV) {
    enableProdMode();
}
