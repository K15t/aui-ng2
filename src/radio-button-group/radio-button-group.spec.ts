import {TestComponentBuilder, ComponentFixture} from '@angular/compiler/testing'
import {it, injectAsync, beforeEach} from '@angular/core/testing';
import {AuiNgRadioButtonGroupComponent} from "./radio-button-group.component";

describe('RadioButtonGroup Component', () => {
    let items : any[] = [
        {id: 1, name: 'foo', color: 'blue'},
        {id: 2, name: 'bar'},
        {id: 3, name: 'baz'}
    ];
    let radioButtonGroup : ComponentFixture<AuiNgRadioButtonGroupComponent>;

    let changes = [];

    beforeEach(injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return tcb.createAsync(AuiNgRadioButtonGroupComponent)
            .then((componentFixture: ComponentFixture<AuiNgRadioButtonGroupComponent>) => {
                radioButtonGroup = componentFixture;
                radioButtonGroup.componentInstance.items = items;
                radioButtonGroup.componentInstance.selection = items[0];
                radioButtonGroup.componentInstance.name = 'foobar';
                radioButtonGroup.componentInstance.title = 'My Options';
                radioButtonGroup.componentInstance.idProperty = 'id';
                radioButtonGroup.componentInstance.labelProperty = 'name';

                radioButtonGroup.detectChanges();
            });
    }));


    it('should have a title', () => {
        let title = radioButtonGroup.nativeElement.querySelector('legend');

        expect(title.innerText).toEqual('My Options');
    });

    it('should have a radio button for each option', () => {
        let radioButtons = radioButtonGroup.nativeElement.querySelectorAll('input.radio');

        expect(radioButtons.length).toEqual(items.length);
    });

    it('should check selection option', () => {
        let checkedButtons = radioButtonGroup.nativeElement.querySelectorAll('input.radio:checked');


        expect(checkedButtons.length).toEqual(1);
        expect(checkedButtons[0].parentElement.innerText).toEqual(' foo');
    });

    it('should change selection if radio button is clicked', (done) => {
        radioButtonGroup.componentInstance.onChange = function (item) {

            expect(item).toEqual(items[1]);
            done();
        };
        radioButtonGroup.detectChanges();

        let radioButtons = radioButtonGroup.nativeElement.querySelectorAll('input.radio');
        radioButtons[1].click();
    });

    it('should change selection if lable is clicked', (done) => {
        radioButtonGroup.componentInstance.onChange = function (item) {
            expect(item).toEqual(items[2]);
            done();
        };
        radioButtonGroup.detectChanges();

        let radioButtons = radioButtonGroup.nativeElement.querySelectorAll('.radio label');

        // create custom event, because click only works on buttons
        let event = document.createEvent('Event');
        event.initEvent('click', true, true);

        radioButtons[2].dispatchEvent(event);
    });

});
