import {SelectionStrategy} from "./selection-strategy";

export class MultiSelectionStrategy implements SelectionStrategy {
    private idGetter: (any) => string;
    private labelGetter: (any) => string;
    private items: any[];

    selection: any[];

    constructor(idGetter, labelGetter, items, selection) {
        this.idGetter = idGetter;
        this.labelGetter = labelGetter;
        this.items = items;
        this.selection = selection;
    }

    selectItem(id): void {
        let selected = this.items.filter((item) => this.idGetter(item) == id);
        this.selection.push(selected[0]);
    }

    deSelectItem(id): void {
        this.selection = this.selection.filter((item) => this.idGetter(item) !== id);
    }

    getSelection(): [string, any] {
        let value = this.selection.map((item) => ({id: this.idGetter(item), text: this.labelGetter(item)}));
        return ['data', value];
    }
}
