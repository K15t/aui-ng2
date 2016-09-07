import {SingleSelectionStrategy} from './single-selection-strategy';

describe('Single Selection Strategy', () => {

    function labelGetter(obj) {
        return obj.label;
    }

    function idGetter(obj) {
        return obj.id;
    }

    let items: any[];
    let selection: any;

    let selectionStrategy: SingleSelectionStrategy;
    beforeEach(() => {
        items = [{id: 1,  label: 'foo', color: 'red'}, {id: 2, label: 'bar'}];
        selection = items[0];
        selectionStrategy = new SingleSelectionStrategy(idGetter, labelGetter, selection);
    });

    it('should return preset selection', () => {
        expect(selectionStrategy.getSelection()).toEqual(['val', 1]);
    });

    it('should deselect item', () => {
        selectionStrategy.deSelectItem(1);
        expect(selectionStrategy.getSelection()).toEqual(['val', null]);
    });

    it('should select item', () => {
        selectionStrategy.selectItem(items[1]);
        expect(selectionStrategy.getSelection()).toEqual(['val', 2]);
    });
});
