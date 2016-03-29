export interface SelectionStrategy {

    /**
     * Selected value.
     */
    selection: any;

    /**
     * Selects the entry with the related id.
     */
    selectItem (id: string): void;

    /**
     * Deselects the entry with the related id.
     */
    deSelectItem (id: string): void;

    /**
     * Gets the current selected entry
     */
    getSelection (): [string, any];
}
