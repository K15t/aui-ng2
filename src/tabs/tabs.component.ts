import {Component, OnInit} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {AuiNgTabComponent} from './tab.component';
import {LogService} from '../services/log.service';

@Component({
    selector: 'auiNgTabs',
    providers: [LogService],
    directives: [...FORM_DIRECTIVES],
    template: `
        <div class="aui-tabs horizontal-tabs">
            <ul class="tabs-menu">
                <li class="menu-item" [ngClass]="{'active-tab': tab.active}" *ngFor="#tab of tabs">
                    <a (click)="setActiveTab(tab)">{{ tab.title }}</a>
                </li>
            </ul>
            <ng-content></ng-content>
        </div>
    `
})
/**
 * Container class to register individual tabs.
 *
 * Example to setup tabs in your template:
 * ...
 * <auiNgTabs>
 *   <auiNgTab title="My tab">
 *       // ... here you can define your desired markup shown as part of the tab if it becomes visible(active)
 *   <auiNgTab>
 * </auiNgTabs>
 * ...
 *
 */
export class AuiNgTabsComponent {

    private tabs: Array<AuiNgTabComponent> = [];

    constructor(
        private logService: LogService
    ) {}

    /**
     * Registers a tab on the current tab container.
     *
     * @param tab tab to register.
     */
    register(tab: AuiNgTabComponent) {
        if (this.tabs.length === 0) {
            tab.setActive(true);
        }
        this.tabs.push(tab);
    }

    /**
     * Sets a registered tab active to make it visible on the screen. A tab which is already active will be set inactive.
     *
     * @param tab Tab which should be set active
     * @returns {boolean} true if the state was changed other false e.g. in case of validation error.
     */
    setActiveTab(tab: AuiNgTabComponent): boolean {
        if (this.tabs.length === 0) {
            this.logService.logInfo('There are no tabs registered yet and thus, nothing to activate.');
        } else if (this.getActiveTab().setActive(false)) {
            return tab.setActive(true);
        }
        return false;
    }

    getActiveTab() {
        if (this.tabs.length === 0) {
            this.logService.logInfo('There are no tab registered yet and thus, there is no active tab.');
        } else {
            for (let tab of this.tabs) {
                if (tab.isActive()) {
                    return tab;
                }
            }
            return this.tabs[0];
        }
    }

}
