export interface WizardStepComponent<T> {

    /**
     * Called before every time when the component will be visible.
     */
    init(): void;

    /**
     * Called before the component will be hidden.
     */
    validate(): boolean;

    /**
     * Gets the data managed by the component to propagate it to the next step of the wizard.
     */
    getData(): T;

    /**
     * Sets the data from a previous components.
     *
     * @param data data set of the previous ste for further processing.
     */
    setData(data: T): void;

}