import {Component, Input} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {AuiNgTabsComponent} from './tabs.component';

@Component({
    selector: 'auiNgTab',
    directives: [...FORM_DIRECTIVES],
    styles: [`
        .aui-ng-tab {
            padding-top: 15px;
            padding-bottom: 15px;
            border-top: 1px solid #ccc;
        }
    `],
    template: `
        <div [hidden]="!active" class="tabs-pane aui-ng-tab">
            <ng-content></ng-content>
        </div>
    `
})
export class AuiNgTabComponent {

    @Input() title: string;
    active: boolean = false;


    constructor(tabs: AuiNgTabsComponent) {
        tabs.register(this);
    }

    /**
     * Sets the state of the tab. To show the tab on the screen set it active set it to true. To ensure that every time only
     * one tab is active, please consider to activate/deactivate a tab using AuiNgTabsComponent and setActiveTab() otherwise
     * you have to manage that manually.
     *
     * @param active true to set the tab active or false for inactive
     * @returns {boolean} true if the state was changed other false e.g. in case of validation error.
     */
    setActive(active: boolean): boolean {
        this.active = active;
        return true;
    }

    /**
     * @returns {boolean} the state if the tab is currently active/show at the screen.
     */
    isActive() {
        return !!this.active;
    }

}
