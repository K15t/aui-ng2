import {Component} from '@angular/core';
import {FORM_DIRECTIVES} from '@angular/common';
import {AUI_NG2_TAB_DIRECTIVES} from '../../src/tabs/index';
import {AuiNgCodeBlockComponent} from '../common/code-block.component';

@Component({
    selector: 'auiNgDemoTabs',
    directives: [...FORM_DIRECTIVES, AuiNgCodeBlockComponent, ...AUI_NG2_TAB_DIRECTIVES],
    template: require('./tabs-demo.component.html')
})
export class TabsDemoComponent {

}
