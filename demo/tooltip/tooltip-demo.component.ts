import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from 'angular2/common';
import {LogService} from '../../src/services/log.service';
import {AUI_NG2_TOOLTIP_DIRECTIVES} from '../../src/tooltip/index';
import {AuiNgCodeBlockComponent} from '../common/code-block.component';

@Component({
    selector: 'demoTabs',
    directives: [...FORM_DIRECTIVES, AuiNgCodeBlockComponent, ...AUI_NG2_TOOLTIP_DIRECTIVES],
    template: require('./tooltip-demo.component.html')
})
export class TooltipDemoComponent {
}
