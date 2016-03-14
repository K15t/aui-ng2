/**
 * Event to trigger an update of the currently opened dialog.
 */
export interface DialogUpdateEvent {

    title?: string;

    showXIcon?: boolean;

    /**
     * Sends the event update to all existing dialogs on bubbling up to the root.
     */
    toAll?: boolean;

}