/**
 * Event to trigger an update of the currently opened dialog.
 */
export interface AuiNgDialogUpdateEvent {

    title?: string;

    showXIcon?: boolean;

    /**
     * Sends the event update to all existing dialogs on bubbling up to the root.
     */
    toAll?: boolean;

    dialogClass?: string;

    dialogContentClass?: string;

    dialogStyle?: string;

    dialogContentStyle?: string;

}