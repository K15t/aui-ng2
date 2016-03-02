import {provide, enableProdMode} from 'angular2/core';
import {bootstrap, ELEMENT_PROBE_PROVIDERS} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {App} from './app';
import {LogService} from '../src/services/log.service';

document.addEventListener('DOMContentLoaded', function main() {
    bootstrap(App, [
        ...('production' === process.env.ENV ? [] : ELEMENT_PROBE_PROVIDERS),
        ...HTTP_PROVIDERS,
        ...ROUTER_PROVIDERS,
        provide(LocationStrategy, {useClass: HashLocationStrategy}),
        LogService
    ]);
});

if ('production' === process.env.ENV) {
    enableProdMode();
}
