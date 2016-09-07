import {async, inject, TestComponentBuilder, ComponentFixture} from '@angular/core/testing';
import {AuiNgSelect2Component} from './select2.component';

describe('Select2 Component', () => {
    let items : any[] = [
        {id: 1, name: 'foo', color: 'blue'},
        {id: 2, name: 'bar'},
        {id: 3, name: 'baz'}
    ];
    let select2 : ComponentFixture<AuiNgSelect2Component>;

    beforeEach(async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return tcb.createAsync(AuiNgSelect2Component)
            .then((componentFixture: ComponentFixture<AuiNgSelect2Component>) => {
                select2 = componentFixture;
                select2.componentInstance.items = items;
                select2.componentInstance.idProperty = 'id';
                select2.componentInstance.labelProperty = 'name';
            });
    })));

    describe('multi selection', () => {

        beforeEach(() => {
            select2.componentInstance.multiple = true;
            select2.componentInstance.selection = [items[0]];
            select2.detectChanges();
        });

        it('should have selected items', () => {
            let selectedItems = select2.nativeElement.querySelectorAll('.select2-search-choice > div');

            expect(selectedItems.length).toEqual(1);
            expect(selectedItems[0].innerText).toEqual('foo');
        });
    });

    describe('single selection', () => {

        beforeEach(() => {
            select2.componentInstance.multiple = false;
            select2.componentInstance.selection = items[2];
            select2.detectChanges();
        });

        it('should have an selected item', () => {
            expect(select2.nativeElement.querySelector('.select2-chosen').innerText).toEqual('baz');
        });
    });

    describe('custom templating', () => {

        beforeEach(() => {
            select2.componentInstance.multiple = false;
            select2.componentInstance.selection = items[0];
            select2.componentInstance.labelProperty = function (object) {
                return '**' + object.name + '**';
            };
            select2.detectChanges();
        });

        it('should display selected item with special template', () => {
            expect(select2.nativeElement.querySelector('.select2-chosen').innerText).toEqual('**foo**');
        });
    });
});
