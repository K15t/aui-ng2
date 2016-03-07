import {Component, ViewChild, Input, AfterContentInit, ElementRef} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {AuiNgTabComponent} from './tab.component';
import {LogService} from '../services/log.service';
import {AuiNgAutoFocus} from '../common/directives/focus-element.directive';

/**
 * Container class to register individual tabs.
 *
 * Example to setup tabs in your template:
 * ...
 * <auiNgTabs>
 *   <auiNgTab title="My tab" maxWidth="250" width="150">
 *       // ... here you can define your desired markup shown as part of the tab if it becomes visible(active)
 *   <auiNgTab>
 * </auiNgTabs>
 * ...
 */
@Component({
    selector: 'auiNgTabs',
    providers: [LogService],
    directives: [...FORM_DIRECTIVES, AuiNgAutoFocus],
    styles: [require('./tabs.component.css')],
    template: `
        <div class="aui-tabs horizontal-tabs">
            <ul class="tabs-menu aui-ng-tabs-menu" #tabsMenu>
                <li class="menu-item" [ngClass]="{'active-tab': tab.active}" *ngFor="#tab of tabs" [style.width.px]="tab.width" [style.max-width.px]="tab.maxWidth">
                    <a (click)="setActiveTab(tab)" class="aui-ng-menu-item">{{ tab.title }}</a>
                </li>
                <li *ngIf="tabsDropDown.length > 0" class="menu-item aui-ng-dropdown-container" [ngClass]="{'active-tab': selectedDropdownTab.isActive()}">
                    <div class="aui-buttons">
                        <a class="aui-button aui-button-split-main aui-ng-dropdown-button" (click)="setActiveTab(selectedDropdownTab)">{{ selectedDropdownTab.title }}</a>
                        <a class="aui-button aui-dropdown2-trigger aui-button-split-more aui-ng-dropdown-button-select" (click)="showDropdownOptions()" (blur)="hideDropdownOptions()"></a>
                    </div>
                    <div class="aui-ng-dropdown-options-container" [hidden]="!showOptions" *ngIf="showOptions">
                        <ul class="aui-ng-dropdown-options aui-list-truncate" (blur)="hideDropdownOptions()" tabindex="-1" auiNgAutoFocus>
                            <li *ngFor="#tab of tabsDropDown" (click)="setActiveTab(tab); selectedDropdownTab = tab;" [hidden]="selectedDropdownTab == tab" class="aui-ng-dropdown-option">
                                {{ tab.title }}
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
            <ng-content></ng-content>
        </div>
    `
})
export class AuiNgTabsComponent implements AfterContentInit {

    tabs: Array<AuiNgTabComponent> = [];
    tabsDropDown: Array<AuiNgTabComponent> = [];
    isTabsDropDownActive: boolean = false;
    showOptions: boolean = false;
    selectedDropdownTab: AuiNgTabComponent = null;

    @ViewChild('tabsMenu') tabsMenuElement: ElementRef;

    constructor(
        private logService: LogService,
        private selfElement: ElementRef
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
            this.hideDropdownOptions();
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
            for (let tab of this.tabsDropDown) {
                if (tab.isActive()) {
                    return tab;
                }
            }
            return this.tabs[0];
        }
    }

    ngAfterContentInit() {

        // get the current width of the overall tabs container
        let widthTabsContainer = this.selfElement.nativeElement.getBoundingClientRect().width;
        // reserve already the width for the dropdown
        let currentTabsWidth = 300;
        let index = 0;

        // iterate over all registered tabs check if width or maxWidth is set if not use the default
        // and check if the tabs is basically visible on the screen. In case if not split the registered tabs
        // and move the rest to the dropdown component.
        for (let tab of this.tabs) {

            let width = tab.maxWidth != undefined && tab.maxWidth != null ? parseInt(tab.maxWidth) : null;

            if (width === null) {
                if (tab.width != undefined && tab.width != null) {
                    width = parseInt(tab.width);
                } else {
                    width = 200;
                }
            }

            if (width + currentTabsWidth > widthTabsContainer && (index !== this.tabs.length - 1 && width < 300)) {
                this.tabsDropDown = this.tabs.splice(index, this.tabs.length - 1);
                this.selectedDropdownTab = this.tabsDropDown[0];
                break;
            } else {
                currentTabsWidth += width;
                index++;
            }
        }
    }

    showDropdownOptions() {
        this.showOptions = true;
    }

    hideDropdownOptions() {
        this.showOptions = false;
    }

    /**
     * Unregisters all tabs which is required for dynamic tabs.
     */
    unregisterAllTabs() {
        this.tabs = [];
        this.tabsDropDown = [];
    }

}
