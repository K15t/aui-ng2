import {Component, Input, Output, OnChanges, AfterViewInit, ElementRef, SimpleChange, EventEmitter} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {SelectionStrategy} from "./selection-strategy";
import {MultiSelectionStrategy} from './multi-selection-strategy';
import {SingleSelectionStrategy} from './single-selection-strategy';
import {AJS} from '../common/libs/aui';


/**
 * Wrapper for select2, supports single and multi item selection
 */
@Component({
    selector: 'auiNgSelect2',
    directives: [...FORM_DIRECTIVES],
    template: `
      <input type="text" class="select2" />
    `
})
export class AuiNgSelect2Component implements OnChanges, AfterViewInit {

    @Input() items: any[];
    @Input() idProperty: string;
    @Input() labelProperty: any;
    @Input() selection: any;
    @Input() multiple: boolean;
    @Input() query: boolean;

    @Output() changed: EventEmitter<any> = new EventEmitter<any>();
    @Input() query:boolean;
    @Output() onQuery:EventEmitter<any> = new EventEmitter<any>();

    private $select2:any;
    private selectionStrategy:SelectionStrategy;

    constructor(private elementRef:ElementRef) {
    }

    ngAfterViewInit() {
        this.init();
        this.updateValue();
    }

    ngOnChanges(changes:{[propertyName:string]:SimpleChange}) {
        if (this.$select2 && changes['items'] || changes['idField'] || changes['labelField']) {
            this.init();
        }

        if (changes['selection'] && this.selectionStrategy) {
            this.selectionStrategy.selection = this.selection;
            this.updateValue();
        }
    }

    init() {
        let selectConfig;

        if (this.items == null) {
            this.items = [];
        }

        this.selectionStrategy = this.getSelectionStrategy();

        if (this.$select2) {
            this.$select2.off();
        }

        selectConfig = {
            multiple: this.multiple,
            data: {
                results: this.getResultItems(),
                text: 'text'
            }
        };

        if (this.query) {
            selectConfig.query = (query) => {
                this.onQuery.emit({
                    term: query.term,
                    callback: (items) => {
                        this.items = items;
                        query.callback({results: this.getResultItems()});
                    }
                });
            };
        }

        this.$select2 = AJS.$(this.elementRef.nativeElement).find('.select2').auiSelect2(selectConfig);

        this.$select2.on('change', this.updateSelection.bind(this));
    }

    getResultItems() {
        if (this.items == null) {
            return [];
        }

        return this.items.map((item) => ({id: this.getId(item), text: this.getLabel(item)}));
    }

    getSelectionStrategy(): SelectionStrategy {
        if (this.multiple) {
            return new MultiSelectionStrategy(
                this.getId.bind(this),
                this.getLabel.bind(this),
                this.selection
            );
        } else {
            return new SingleSelectionStrategy(
                this.getId.bind(this),
                this.getLabel.bind(this),
                this.selection
            );
        }
    }

    updateSelection(event) {
        if (event.removed) {
            this.selectionStrategy.deSelectItem(event.removed.id);
        }

        if (event.added) {
            this.selectionStrategy.selectItem(this.getItem(event.added.id));
        }

        this.changed.emit(this.selectionStrategy.selection);
    }

    getItem(id) {
        return this.items.filter((item) => this.getId(item) === id)[0];
    }

    updateValue(): void {
        let [type, value] = this.selectionStrategy.getSelection();

        if (this.$select2) {
            this.$select2.auiSelect2(type, value);
        }
    }

    getLabel(item: any): string {
        if (typeof this.labelProperty === "function") {
            return this.labelProperty(item);
        }
        return item[this.labelProperty];
    }

    getId(item:any):string {
        return item[this.idProperty];
    }
}
