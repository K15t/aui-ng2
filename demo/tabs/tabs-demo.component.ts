import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {AUI_NG2_TAB_DIRECTIVES} from '../../src/tabs/index';
import {AuiNgCodeBlockComponent} from '../common/code-block.component';

@Component({
    selector: 'demoTabs',
    directives: [...FORM_DIRECTIVES, AuiNgCodeBlockComponent, ...AUI_NG2_TAB_DIRECTIVES],
    template: require('./tabs-demo.component.html')
})
export class TabsDemoComponent {

}
