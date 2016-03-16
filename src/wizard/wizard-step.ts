import {AuiNgWizardComponent} from './wizard.component';

export interface WizardStep {
    
    /**
     * Invoked to make the content of the step visible on the screen.
     */
    show(): void;

    /**
     * Invoked to hide the content of the step on the screen.
     */
    hide(): void;

    /**
     * Checks if the current step is active and visible on the screen.
     */
    isActive(): boolean;

    /**
     * Validates the current data. This will be called on next and offers the
     * possibility to stay on the current step. To skip next and stay on the
     * current step return false.
     */
    validate(): boolean;

    /**
     * Sets a new data object which will be propagate to the next step.
     *
     * @param data data object
     */
    setData(data: any): void;

    /**
     * Gets the current data object e.g. which a previous step has set.
     */
    getData(): any;

    /**
     * Gets the overall wizard container.
     */
    getWizard(): AuiNgWizardComponent;

}
