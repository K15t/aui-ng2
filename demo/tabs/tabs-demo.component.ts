import {Component, AfterViewChecked} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from 'angular2/common';
import {LogService} from '../../src/services/log.service';
import {AuiNgTabsComponent, AUI_NG2_TAB_DIRECTIVES} from '../../src/tabs/index';
import {AuiNgCodeBlockComponent} from '../common/code-block.component';

@Component({
    selector: 'demoTabs',
    providers: [LogService],
    directives: [...FORM_DIRECTIVES, AuiNgCodeBlockComponent, ...AUI_NG2_TAB_DIRECTIVES],
    template: require('./tabs-demo.component.html')
})
export class TabsDemoComponent implements AfterViewChecked {

    constructor(
        private logService: LogService
    ) {}

    ngAfterViewChecked() {
        // Component views have been checked
    }

}
