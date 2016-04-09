import {Component, Inject} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {DialogDemoComponent} from './dialog/dialog-demo.component';
import {TabsDemoComponent} from './tabs/tabs-demo.component';
import {TooltipDemoComponent} from './tooltip/tooltip-demo.component';
import {Select2DemoComponent} from './select2/select2-demo.component';
import {LogService, LogLevel} from '../src/common/services/log.service.ts';
import {OverlayDemoComponent} from './overlay/overlay-demo.component';
import {NotificationDemoComponent} from './notifications/notification-demo.component';
import {IS_DEV_MODE} from './constants';
import {RadioButtonGroupDemoComponent} from './radio-button-group/radio-button-group-demo.component';

@Component({
    selector: 'auiNgApp',
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
                        <li router-active>
                            <a [routerLink]=" ['TooltipDemoComponent']">Tooltips</a>
                        </li>
                        <li router-active>
                            <a [routerLink]=" ['Select2DemoComponent']">Select2</a>
                        </li>
                        <li router-active>
                            <a [routerLink]=" ['RadioButtonGroupDemoComponent']">Radio button group</a>
                        </li>
                        <li router-active>
                            <a [routerLink]=" ['OverlayDemoComponent']">Overlays</a>
                        </li>
                        <li router-active>
                            <a [routerLink]=" ['NotificationDemoComponent']">Notifications</a>
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
    {path: '/tooltip', name: 'TooltipDemoComponent', component: TooltipDemoComponent},
    {path: '/select2', name: 'Select2DemoComponent', component: Select2DemoComponent},
    {path: '/radio-button-group', name: 'RadioButtonGroupDemoComponent', component: RadioButtonGroupDemoComponent},
    {path: '/overlay', name: 'OverlayDemoComponent', component: OverlayDemoComponent},
    {path: '/notifications', name: 'NotificationDemoComponent', component: NotificationDemoComponent},
    {path: '/', redirectTo: ['DialogDemoComponent']}
])
export class AppComponent {

    constructor(
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
