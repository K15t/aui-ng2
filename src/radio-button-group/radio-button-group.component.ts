import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';

@Component({
    selector: 'auiNgRadioButtonGroup',
    directives: [...FORM_DIRECTIVES],
    styles: [`
      .aui-ng2-orientation-horizontal .radio{
        float: left;
        margin-right: 10px;
      }
    `],
    template: `
      <fieldset class="group aui-ng2-orientation-{{orientation}}">
        <legend><span>{{title}}</span></legend>
        <div class="radio"
             *ngFor="#item of items">
            <input class="radio" type="radio" name="{{name}}"
                   id="{{name}}-{{getId(item)}}"
                   (change)="onChange(item)"
                   [checked]="getId(selection) == getId(item)">
            <label attr.for="{{name}}-{{getId(item)}}">{{getLabel(item)}}</label>
        </div>
      </fieldset>
    `
})
export class AuiNgRadioButtonGroupComponent {
    @Input() orientation: string;
    @Input() title: string;
    @Input() name: string;
    @Input() selection: any;
    @Input() items: any[];
    @Input() idProperty: string;
    @Input() labelProperty: any;
    @Output() changed : EventEmitter<any> = new EventEmitter<any>();

    private selection: any = {};

    private onChange (item) {
        this.changed.emit(item);
    }

    private getLabel(item: any): string {
        if (typeof this.labelProperty === 'function') {
            return this.labelProperty(item);
        }
        return item && item[this.labelProperty];
    }

    private getId(item:any):string {
        return item && item[this.idProperty];
    }

}
