import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {AUI_NG2_SELECT2_DIRECTIVES} from '../../src/select2/index';
import {AuiNgCodeBlockComponent} from '../common/code-block.component';

@Component({
    selector: 'auiNgDemoSelect2',
    directives: [...FORM_DIRECTIVES, AuiNgCodeBlockComponent, ...AUI_NG2_SELECT2_DIRECTIVES],
    template: require('./select2-demo.component.html')
})
export class Select2DemoComponent {
    selection = [{value: 'js', label: 'Javascript'}];
    selection2 = [];
    selected = {value: 'cs', label: 'CoffeeScript'};
    selected2 = null;
    items = [
        {value: 'js', label: 'Javascript'},
        {value: 'cs', label: 'CoffeeScript'},
        {value: 'elm', label: 'Elm'},
        {value: 'ng', label: 'Angular', version: 2.0},
    ];

    addItem(option:String) {
        this.items = this.items.concat([{value: 'item_' + Math.random(), label: 'Another'}]);
    }

    removeLast() {
        this.selection = this.selection.slice(0, -1);
    }

    onQuery(query) {
        setTimeout(function () {
            if (query.term && query.term.length > 0) {

                var items = [], i, j, s;
                for (i = 1; i < 5; i++) {
                    s = '';
                    for (j = 0; j < i; j++) {
                        s = s + query.term;
                    }
                    items.push({value: query.term + i, label: s, v: 5});
                }

                query.callback(items);
            }
        }, 1000);
    }
}
