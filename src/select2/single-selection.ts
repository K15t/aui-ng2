import {Select2Selection} from "./select2-selection";

export class SingleSelection implements Select2Selection {
    private _idGetter:(any) => string;
    private _labelGetter:(any) => string;
    private _items:any[];

    selection:any;

    constructor(idGetter, lableGetter, items, selection) {
        this._idGetter = idGetter;
        this._labelGetter = lableGetter;
        this._items = items;
        this.selection = selection;
    }

    selectItem(id): any {
        let selected = this._items.filter((item) => this._idGetter(item) == id);
        this.selection = selected[0];
    }

    unselectItem(id): any {
        this.selection = null;
    }

    getSelect2Value():[string, any] {
        let value = this.selection == null ? null : this._idGetter(this.selection);
        return ['val', value];
    }
}
