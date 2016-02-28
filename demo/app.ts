import {Component, OnInit} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {RouteConfig, Redirect, ROUTER_DIRECTIVES} from 'angular2/router';
import {DialogDemoComponent} from './dialog/dialog-demo.component';

@Component({
    selector: 'app',
    directives: [...ROUTER_DIRECTIVES],
    template: `
    <header>
    </header>
    <main>
        <router-outlet></router-outlet>
    </main>
  `
})
@RouteConfig([
    {path:'/dialog', name: 'DialogDemoComponent', component: DialogDemoComponent},
    {path:'/', redirectTo: ['DialogDemoComponent']}
])
export class App {
    private rootComponent: string;
}
