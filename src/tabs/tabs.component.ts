import {Component, Directive, Input, AfterViewInit, ElementRef, ViewChildren, QueryList} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {AuiNgTabComponent} from './tab.component';
import {LogService} from '../common/services/log.service.ts';
import {AuiNgAutoFocus} from '../common/directives/focus-element.directive';

/**
 * Directive to lookup the native element of the tab headers to determine the actual width.
 */
@Directive({
    selector: '[auiNgTabHeaderElementRef]'
})
export class AuiNgTabHeaderElementRef {
    constructor(
        private selfElement: ElementRef
    ) {}

    getWidth() {
        return this.selfElement.nativeElement.getBoundingClientRect().width;
    }
}

/**
 * Container class to register individual tabs.
 *
 * Example to setup tabs in your template:
 * ...
 * <auiNgTabs maxWidth="500">
 *   <auiNgTab title="My tab" maxWidth="250" width="150">
 *       // ... here you can define your desired markup shown as part of the tab if it becomes visible(active)
 *   <auiNgTab>
 * </auiNgTabs>
 * ...
 */
@Component({
    selector: 'auiNgTabs',
    providers: [LogService],
    directives: [...FORM_DIRECTIVES, AuiNgAutoFocus, AuiNgTabHeaderElementRef],
    styles: [require('./tabs.component.css')],
    template: require('./tabs.component.html')
})
export class AuiNgTabsComponent implements AfterViewInit {

    tabs: Array<AuiNgTabComponent> = [];
    tabsDropDown: Array<AuiNgTabComponent> = [];
    showOptions: boolean = false;
    selectedDropdownTab: AuiNgTabComponent = null;
    tabContainerVisibility: string = 'hidden';
    maxWidthDropdownPx: number = 170;
    dropdownListOrientation: string = '0';

    @Input() maxWidthPx;
    @ViewChildren(AuiNgTabHeaderElementRef) tabTitles: QueryList<AuiNgTabHeaderElementRef>;

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
        if (this.tabs.length === 0 && this.tabsDropDown.length === 0) {
            this.logService.logInfo('There are no tabs registered yet and thus, nothing to activate.');
        } else if (tab !== undefined && tab !== null) {
            this.hideDropdownOptions();
            if (this.getActiveTab() !== undefined && this.getActiveTab() !== null) {
                this.getActiveTab().setActive(false);
            }
            return tab.setActive(true);
        }
        return false;
    }

    getActiveTab() {
        if (this.tabs.length === 0 && this.tabsDropDown.length === 0) {
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

    ngAfterViewInit() {
        this.calculateTabWidth();
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
        this.hideTabs();
        this.tabs = [];
        this.tabsDropDown = [];
    }

    hideTabs() {
        this.tabContainerVisibility = 'hidden';
    }

    showTabs() {
        this.tabContainerVisibility = 'visible';
    }

    calculateTabWidth() {

        setTimeout(() => {
            let widthTabsContainer;

            // get the current width of the overall tabs container
            if (this.maxWidthPx != null && this.maxWidthPx !== undefined) {
                widthTabsContainer = parseInt(this.maxWidthPx);
            } else {
                widthTabsContainer = this.selfElement.nativeElement.getBoundingClientRect().width;
            }
            // reserve already the width for the dropdown
            let currentTabsWidth = 0;
            let index = 0;

            // iterate over all registered tabs check verify the width of the tab if it is basically visible on the screen.
            // In case if not split the registered tabs and move the rest to the dropdown component.
            for (let tab of this.tabs) {

                let width = this.tabTitles.toArray()[index].getWidth();

                if (width + currentTabsWidth > widthTabsContainer || (index !== this.tabs.length - 1
                    && width + currentTabsWidth + this.maxWidthDropdownPx > widthTabsContainer - 50)) {
                    this.tabsDropDown = this.tabs.splice(index, this.tabs.length);
                    this.selectedDropdownTab = this.tabsDropDown[0];
                    break;
                } else {
                    currentTabsWidth += width;
                    index++;
                }
            }

            if (this.tabs.length <= 2 ) {
                this.dropdownListOrientation = 'inherit';
            }

            this.showTabs();

        }, 100);
    }

}
