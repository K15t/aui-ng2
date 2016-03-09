import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from 'angular2/common';
import {LogService} from '../../src/services/log.service';
import {AuiNgTooltipComponent, AUI_NG2_TOOLTIP_DIRECTIVES} from '../../src/tooltip/index';
import {AuiNgCodeBlockComponent} from '../common/code-block.component';

@Component({
    selector: 'demoTabs',
    providers: [LogService],
    directives: [...FORM_DIRECTIVES, AuiNgCodeBlockComponent, AuiNgTooltipComponent],
    template: require('./tooltip-demo.component.html')
})
export class TooltipDemoComponent {

    constructor(
        private logService: LogService
    ) {}

}
