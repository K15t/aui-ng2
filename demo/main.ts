import {provide, enableProdMode} from '@angular/core';
import {ELEMENT_PROBE_PROVIDERS} from '@angular/platform-browser';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {HTTP_PROVIDERS} from '@angular/http';
import {TRANSLATE_PROVIDERS} from 'ng2-translate/ng2-translate';
import {AuiNgDemoAppComponent} from './app.component';
import {LogService} from '../src/common/services/log.service.ts';
import {IS_DEV_MODE} from './constants';

document.addEventListener('DOMContentLoaded', function main() {
    bootstrap(AuiNgDemoAppComponent, [
        provide(IS_DEV_MODE, {useValue: process.env.ENV === 'development'}),
        ...('production' === process.env.ENV ? [] : ELEMENT_PROBE_PROVIDERS),
        ...HTTP_PROVIDERS,
        ...ROUTER_PROVIDERS,
        ...TRANSLATE_PROVIDERS,
        provide(LocationStrategy, {useClass: HashLocationStrategy}),
        LogService
    ]);
});

if ('production' === process.env.ENV) {
    enableProdMode();
}
