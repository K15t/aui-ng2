import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {AUI_NG2_RADIO_BUTTON_GROUP_DIRECTIVES} from '../../src/radio-button-group/index';
import {AuiNgCodeBlockComponent} from '../common/code-block.component';

@Component({
    selector: 'demoRadioButtonGroup',
    directives: [...FORM_DIRECTIVES, AuiNgCodeBlockComponent, ...AUI_NG2_RADIO_BUTTON_GROUP_DIRECTIVES],
    template: require('./radio-button-group-demo.component.html')
})
export class RadioButtonGroupDemoComponent {
    private items: any = [
        {name: 'yellow', id: 1},
        {name: 'blue', id: 2},
        {name: 'green', id: 3},
        {name: 'red', id: 4}
    ];

    private selection: any = this.items[1];
}
