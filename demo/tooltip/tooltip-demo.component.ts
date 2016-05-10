import {Component} from '@angular/core';
import {FORM_DIRECTIVES} from '@angular/common';
import {AUI_NG2_TOOLTIP_DIRECTIVES} from '../../src/tooltip/index';
import {AuiNgCodeBlockComponent} from '../common/code-block.component';

@Component({
    selector: 'auiNgDemoTabs',
    directives: [...FORM_DIRECTIVES, AuiNgCodeBlockComponent, ...AUI_NG2_TOOLTIP_DIRECTIVES],
    template: require('./tooltip-demo.component.html')
})
export class TooltipDemoComponent {
}
