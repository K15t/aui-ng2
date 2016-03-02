import {Component, OnInit} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {RouteConfig, Redirect, ROUTER_DIRECTIVES} from 'angular2/router';
import {DialogDemoComponent} from './dialog/dialog-demo.component';
import {TabsDemoComponent} from './tabs/tabs-demo.component';

@Component({
    selector: 'app',
    directives: [...ROUTER_DIRECTIVES],
    styles: [`
        .aui-ng-page {
            height: 100vh;
            width: 100vw;
            padding: 15px;
        }

        .aui-ng-nav {
            max-width: 150px;
            min-width: 150px;
            vertical-align: top;
            padding-top: 25px;
            border-right: 1px solid #ccc;
        }

        .aui-ng-content {
            vertical-align: top;
            padding-left: 15px;
        }
    `],
    template: `
        <table class="aui-ng-page">
            <tr>
                <td class="aui-ng-nav" width="15%">
                    <ul>
                        <li router-active>
                            <a [routerLink]=" ['DialogDemoComponent'] ">Dialog</a>
                        </li>
                        <li router-active>
                            <a [routerLink]=" ['TabsDemoComponent'] ">Tabs</a>
                        </li>
                     </ul>
                </td>
                <td class="aui-ng-content" width="85%">
                    <router-outlet></router-outlet>
                </td>
            </tr>
        </table>

  `
})
@RouteConfig([
    {path: '/dialog', name: 'DialogDemoComponent', component: DialogDemoComponent},
    {path: '/tabs', name: 'TabsDemoComponent', component: TabsDemoComponent},
    {path: '/', redirectTo: ['DialogDemoComponent']}
])
export class App {
}
