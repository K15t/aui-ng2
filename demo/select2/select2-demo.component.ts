import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {AUI_NG2_SELECT2_DIRECTIVES} from '../../src/select2/index';
import {AuiNgCodeBlockComponent} from '../common/code-block.component';

@Component({
    selector: 'demoSelect2',
    directives: [...FORM_DIRECTIVES, AuiNgCodeBlockComponent, ...AUI_NG2_SELECT2_DIRECTIVES],
    template: require('./select2-demo.component.html')
})
export class Select2DemoComponent {

    selection = [{value: 'js', label: 'Javascript'}];

    selected = {value: 'cs', label: 'CoffeeScript'};

    items = [
        {value: 'js', label: 'Javascript'},
        {value: 'cs', label: 'CoffeeScript'},
        {value: 'elm', label: 'Elm'},
        {value: 'ng', label: 'Angular', version: 2.0},
    ];

    addItem(option: String) {
        this.items.push({value: 'item_' + Math.random(), label: 'Another'});
    }

    removeLast() {
        this.selection = this.selection.slice(0, -1);
    }

    onChangedSingle(selected) {
        this.selected = selected;
    }

    onChangedMulti(selection) {
        this.selection = selection;
    }
}
