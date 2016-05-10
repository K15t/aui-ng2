import {Component, Inject} from '@angular/core';
import {Routes, ROUTER_DIRECTIVES, Router} from '@angular/router';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {DialogDemoComponent} from './dialog/dialog-demo.component';
import {TabsDemoComponent} from './tabs/tabs-demo.component';
import {TooltipDemoComponent} from './tooltip/tooltip-demo.component';
import {Select2DemoComponent} from './select2/select2-demo.component';
import {LogService, LogLevel} from '../src/common/services/log.service.ts';
import {IS_DEV_MODE} from './constants';
import {RadioButtonGroupDemoComponent} from './radio-button-group/radio-button-group-demo.component';


@Component({
    selector: 'auiNgDemoApp',
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
                            <a [routerLink]="['/dialog'] ">Dialog</a>
                        </li>
                        <li router-active>
                            <a [routerLink]=" ['/tabs'] ">Tabs</a>
                        </li>
                        <li router-active>
                            <a [routerLink]=" ['/tooltip']">Tooltips</a>
                        </li>
                        <li router-active>
                            <a [routerLink]=" ['/select2']">Select2</a>
                        </li>
                        <li router-active>
                            <a [routerLink]=" ['/radio-button-group']">Radio button group</a>
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
@Routes([
    {path: '/', component: DialogDemoComponent}, // remove this entry as soon as useAsDefault is implemented
    {path: '/dialog', component: DialogDemoComponent}, // add {useAsDefault: true}
    {path: '/tabs', component: TabsDemoComponent},
    {path: '/tooltip', component: TooltipDemoComponent},
    {path: '/select2', component: Select2DemoComponent},
    {path: '/radio-button-group', component: RadioButtonGroupDemoComponent},
])
export class AuiNgDemoAppComponent {

    constructor(
        private router: Router,
        private logService: LogService,
        @Inject(IS_DEV_MODE) private isDevMode: string,
        translate : TranslateService
    ) {
        if (isDevMode) {
            this.logService.setLogLevel(LogLevel.DEBUG);
        }

        translate.setTranslation('en', Object.assign({}, require('../src/assets/i18n/en.json'), require('./assets/i18n/en.json')));
        translate.setTranslation('de', Object.assign({}, require('../src/assets/i18n/de.json'), require('./assets/i18n/de.json')));
        translate.use('en');
    }
}
