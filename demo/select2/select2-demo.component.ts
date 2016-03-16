import {Component, AfterViewChecked} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from 'angular2/common';
import {LogService} from '../../src/services/log.service';
import {AuiNgSelect2Component, AUI_NG2_SELECT2_DIRECTIVES} from '../../src/select2/index';
import {AuiNgCodeBlockComponent} from '../common/code-block.component';

@Component({
    selector: 'demoSelect2',
    providers: [LogService],
    directives: [...FORM_DIRECTIVES, AuiNgCodeBlockComponent, ...AUI_NG2_SELECT2_DIRECTIVES],
    template: require('./select2-demo.component.html')
})
export class Select2DemoComponent implements AfterViewChecked {

    constructor(
        private logService: LogService
    ) {}

    ngAfterViewChecked() {
        // Component views have been checked
    }

}
