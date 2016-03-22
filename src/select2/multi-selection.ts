import {Select2Selection} from "./select2-selection";

export class MultiSelection implements Select2Selection {
    private _idGetter:(any) => string;
    private _labelGetter:(any) => string;
    private _items:any[];

    selection:any[];

    constructor(idGetter, labelGetter, items, selection) {
        this._idGetter = idGetter;
        this._labelGetter = labelGetter;
        this._items = items;
        this.selection = selection;
    }

    selectItem(id):void {
        let selected = this._items.filter((item) => this._idGetter(item) == id);
        this.selection.push(selected[0]);
    }

    unselectItem(id):void {
        this.selection = this.selection.filter((item) => this._idGetter(item) !== id);
    }

    getSelect2Value():[string, any] {
        let value = this.selection.map((item) => ({id: this._idGetter(item), text: this._labelGetter(item)}));
        return ['data', value];
    }
}
