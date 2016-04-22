export interface SelectionStrategy {

    /**
     * Selected value.
     */
    selection: any;

    /**
     * Selects the entry with the related id.
     */
    selectItem (item: any): void;

    /**
     * Deselects the entry with the related id.
     */
    deSelectItem (id: any): void;

    /**
     * Gets the current selected entry
     */
    getSelection (): [string, any];
}
