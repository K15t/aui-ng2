import {provide, enableProdMode} from 'angular2/core';
import {bootstrap, ELEMENT_PROBE_PROVIDERS} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {App} from './app';

document.addEventListener('DOMContentLoaded', function main() {
    bootstrap(App, [
        ...('production' === process.env.ENV ? [] : ELEMENT_PROBE_PROVIDERS),
        ...HTTP_PROVIDERS,
        ...ROUTER_PROVIDERS,
        provide(LocationStrategy, {useClass: HashLocationStrategy}),
    ]);
});

if ('production' === process.env.ENV) {
    enableProdMode();
}
