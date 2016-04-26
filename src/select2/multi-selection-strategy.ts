import {SelectionStrategy} from './selection-strategy';

export class MultiSelectionStrategy implements SelectionStrategy {
    public selection: any[];

    private idGetter: (item: any) => string;
    private labelGetter: (item: any) => string;

    constructor(idGetter, labelGetter, selection) {
        this.idGetter = idGetter;
        this.labelGetter = labelGetter;
        this.selection = selection;
    }

    selectItem(item): void {
        this.selection.push(item);
    }

    deSelectItem(id): void {
        this.selection = this.selection.filter((other) => this.idGetter(other) !== id);
    }

    getSelection(): [string, any] {
        let value = this.selection.map((item) => ({id: this.idGetter(item), text: this.labelGetter(item)}));
        return ['data', value];
    }
}
