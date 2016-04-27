import {SelectionStrategy} from './selection-strategy';

export class SingleSelectionStrategy implements SelectionStrategy {

    public selection: any;

    private idGetter: (item: any) => string;
    private labelGetter: (item: any) => string;

    constructor(idGetter, lableGetter, selection) {
        this.idGetter = idGetter;
        this.labelGetter = lableGetter;
        this.selection = selection;
    }

    selectItem(item): any {
        this.selection = item;
    }

    deSelectItem(id): any {
        this.selection = null;
    }

    getSelection(): [string, any] {
        let value = this.selection == null ? null : this.idGetter(this.selection);
        return ['val', value];
    }
}
