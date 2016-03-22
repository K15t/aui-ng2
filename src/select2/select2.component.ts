import {Component, Input, OnChanges, AfterViewInit, ElementRef, SimpleChange} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';

/**
 * Single tab component which can be used to register on the related tabs component. For more details please see the
 * tabs component which show on an example how to use it.
 */
@Component({
    selector: 'auiNgSelect2',
    directives: [...FORM_DIRECTIVES],
    template: `
      <select class="select2" multiple>
        <option *ngFor="#item of items" value="{{getId(item)}}">{{getLabel(item)}}</option>
      </select>
    `
})
export class AuiNgSelect2Component implements OnChanges, AfterViewInit {

    @Input() items:any[];
    @Input() idProperty:string;
    @Input() labelProperty:string;
    @Input() selection:any[];

    private _$select2:JQuery;

    constructor(private elementRef:ElementRef) {
    }

    ngAfterViewInit() {
        this.initSelect2();
        this.updateValue();
    }

    ngOnChanges(changes:{[propertyName:string]:SimpleChange}) {
        if (this._$select2 && changes['items'] || changes['idField'] || changes['labelField']) {
            this.initSelect2();
        }

        if (changes['selection']) {
            this.updateValue();
        }
    }

    initSelect2() {
        if (this._$select2) {
            this._$select2.off();
        }

        this._$select2 = AJS.$(this.elementRef.nativeElement)
            .find('.select2')
            .auiSelect2();

        this._$select2.on('change', this.updateSelection.bind(this));
    }

    updateSelection (e) {
        if (e.removed) {
            this.unselectItem(e.removed.id);
        }

        if (e.added) {
            this.selectItem(e.added.id);
        }
    }

    unselectItem (id) {
        // using procedural solution, because binding breaks if selection is replaced with a new array
        for (let i = 0; i < this.selection.length; i++) {
            if (this.getId(this.selection[i]) == id) {
                this.selection.splice(i, 1);
            }
        }
    }

    selectItem (id) {
        let selected = this.items.filter((item) => this.getId(item) == id);
        this.selection.push(selected[0]);
    }

    updateValue():void {
        if (this._$select2) {
            this._$select2.auiSelect2('data', this.getSelection(this.selection));
        }
    }

    getSelection(list):[{id:string, text:string}] {
        return list.map((item) => ({id: this.getId(item), text: this.getLabel(item)}));
    }


    getLabel(item:any):string {
        return item[this.labelProperty];
    }

    getId(item:any):string {
        return item[this.idProperty];
    }
}
