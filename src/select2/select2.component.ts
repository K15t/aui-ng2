import {Component, Input, Output, OnChanges, AfterViewInit, ElementRef, SimpleChange, EventEmitter} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {Select2Selection} from "./select2-selection";
import {MultiSelection} from './multi-selection';
import {SingleSelection} from './single-selection';

/**
 * Wrapper for select2, supports single and multi item selection
 */
@Component({
    selector: 'auiNgSelect2',
    directives: [...FORM_DIRECTIVES],
    template: `
      <select class="select2" [multiple]="multiple">
        <option *ngFor="#item of items" value="{{getId(item)}}">{{getLabel(item)}}</option>
      </select>
    `
})
export class AuiNgSelect2Component implements OnChanges, AfterViewInit {

    @Input() items:any[];
    @Input() idProperty:string;
    @Input() labelProperty:string;
    @Input() selection:any;
    @Input() multiple:boolean;
    @Output() onChanged:EventEmitter<any> = new EventEmitter<any>();

    private _$select2:JQuery;
    private _selectionService:Select2Selection;

    constructor(private elementRef:ElementRef) {
    }

    ngAfterViewInit() {
        this.init();
        this.updateValue();
    }

    ngOnChanges(changes:{[propertyName:string]:SimpleChange}) {
        if (this._$select2 && changes['items'] || changes['idField'] || changes['labelField']) {
            this.init();
        }

        if (changes['selection'] && this._selectionService) {
            this._selectionService.selection = this.selection;
            this.updateValue();
        }
    }

    init() {
        this._selectionService = this.getSelectionService();

        if (this._$select2) {
            this._$select2.off();
        }

        this._$select2 = AJS.$(this.elementRef.nativeElement)
            .find('.select2')
            .auiSelect2();

        this._$select2.on('change', this.updateSelection.bind(this));
    }

    getSelectionService () : Select2Selection{
        if (this.multiple) {
            return new MultiSelection(
                this.getId.bind(this),
                this.getLabel.bind(this),
                this.items,
                this.selection
            );
        } else {
            return new SingleSelection(
                this.getId.bind(this),
                this.getLabel.bind(this),
                this.items,
                this.selection
            );
        }
    }

    updateSelection (e) {
        if (e.removed) {
            this._selectionService.unselectItem(e.removed.id);
        }

        if (e.added) {
            this._selectionService.selectItem(e.added.id);
        }

        this.onChanged.emit(this._selectionService.selection);
    }

    updateValue():void {
        let [type, value] = this._selectionService.getSelect2Value();

        if (this._$select2) {
            this._$select2.auiSelect2(type, value);
        }
    }

    getLabel(item:any):string {
        return item[this.labelProperty];
    }

    getId(item:any):string {
        return item[this.idProperty];
    }
}
