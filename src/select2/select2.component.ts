import {Component, Input, OnInit} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';

/**
 * Single tab component which can be used to register on the related tabs component. For more details please see the
 * tabs component which show on an example how to use it.
 */
@Component({
    selector: 'auiNgSelect2',
    directives: [...FORM_DIRECTIVES],
    template: require('./select2.component.html')
})
export class AuiNgSelect2Component implements OnInit {

    @Input() items: Array<string>;

    constructor() {
    }

    ngOnInit() {
        AJS.$('.select2').auiSelect2();
    }

    /**
     * Sets the state of the tab. To show the tab on the screen set it active set it to true. To ensure that every time only
     * one tab is active, please consider to activate/deactivate a tab using AuiNgTabsComponent and setActiveTab() otherwise
     * you have to manage that manually.
     *
     * @param active true to set the tab active or false for inactive
     * @returns {boolean} true if the state was changed other false e.g. in case of validation error.
     */

}
