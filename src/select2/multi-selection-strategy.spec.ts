import {it, beforeEach} from "angular2/testing";
import {MultiSelectionStrategy} from "./multi-selection-strategy";

describe('Single Selection Strategy', () => {

    function labelGetter(obj) {
        return obj.label;
    }


    function idGetter(obj) {
        return obj.id;
    }

    let items: any[];
    let selection: any[];

    let selectionStrategy: MultiSelectionStrategy;
    beforeEach(() => {
        items = [{id: 1,  label: 'foo', color: 'red'}, {id: 2, label: 'bar'}, {id: 3, label: 'baz'}];
        selection = [items[0]];

        selectionStrategy = new MultiSelectionStrategy(idGetter, labelGetter, items, selection);
    });

    it('should return preset selection', () => {
        expect(selectionStrategy.getSelection()).toEqual(['data', [{id: 1, text: 'foo'}]]);
    });

    it('should deselect item', () => {
        selectionStrategy.deSelectItem(1);
        expect(selectionStrategy.getSelection()).toEqual(['data', []]);
    });

    it('should deselect nothing if item isn\'t selected', () => {
        selectionStrategy.deSelectItem(2);
        expect(selectionStrategy.getSelection()).toEqual(['data', [{id: 1, text: 'foo'}]]);
    });

    it('should select item', () => {
        selectionStrategy.selectItem(3);
        expect(selectionStrategy.getSelection()).toEqual(['data', [{id: 1, text: 'foo'}, {id: 3, text: 'baz'}]]);
    });
});
