import {SelectionStrategy} from "./selection-strategy";

export class SingleSelectionStrategy implements SelectionStrategy {
    private idGetter: (any) => string;
    private labelGetter: (any) => string;
    private items: any[];

    selection: any;

    constructor(idGetter, lableGetter, items, selection) {
        this.idGetter = idGetter;
        this.labelGetter = lableGetter;
        this.items = items;
        this.selection = selection;
    }

    selectItem(id): any {
        let selected = this.items.filter((item) => this.idGetter(item) == id);
        this.selection = selected[0];
    }

    deSelectItem(id): any {
        this.selection = null;
    }

    getSelection(): [string, any] {
        let value = this.selection == null ? null : this.idGetter(this.selection);
        return ['val', value];
    }
}
