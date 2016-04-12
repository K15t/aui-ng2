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
      <select class="select2" [multiple]="multiple">
        <option *ngFor="#item of items" value="{{ getId(item) }}">{{ getLabel(item) }}</option>
      </select>
    `
})
export class AuiNgSelect2Component implements OnChanges, AfterViewInit {

    @Input() items: any[];
    @Input() idProperty: string;
    @Input() labelProperty: string;
    @Input() selection: any;
    @Input() multiple: boolean;
    @Output() changed: EventEmitter<any> = new EventEmitter<any>();

    private $select2: any;
    private selectionStrategy: SelectionStrategy;

    constructor(
        private elementRef: ElementRef
    ) {}

    ngAfterViewInit() {
        this.init();
        this.updateValue();
    }

    ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
        if (this.$select2 && changes['items'] || changes['idField'] || changes['labelField']) {
            this.init();
        }

        if (changes['selection'] && this.selectionStrategy) {
            this.selectionStrategy.selection = this.selection;
            this.updateValue();
        }
    }

    init() {
        this.selectionStrategy = this.getSelectionStrategy();

        if (this.$select2) {
            this.$select2.off();
        }

        this.$select2 = AJS.$(this.elementRef.nativeElement).find('.select2').auiSelect2();

        this.$select2.on('change', this.updateSelection.bind(this));
    }

    getSelectionStrategy(): SelectionStrategy {
        if (this.multiple) {
            return new MultiSelectionStrategy(
                this.getId.bind(this),
                this.getLabel.bind(this),
                this.items,
                this.selection
            );
        } else {
            return new SingleSelectionStrategy(
                this.getId.bind(this),
                this.getLabel.bind(this),
                this.items,
                this.selection
            );
        }
    }

    updateSelection(event) {
        if (event.removed) {
            this.selectionStrategy.deSelectItem(event.removed.id);
        }

        if (event.added) {
            this.selectionStrategy.selectItem(event.added.id);
        }

        this.changed.emit(this.selectionStrategy.selection);
    }

    updateValue(): void {
        let [type, value] = this.selectionStrategy.getSelection();

        if (this.$select2) {
            this.$select2.auiSelect2(type, value);
        }
    }

    getLabel(item: any): string {
        return item[this.labelProperty];
    }

    getId(item: any): string {
        return item[this.idProperty];
    }
}
