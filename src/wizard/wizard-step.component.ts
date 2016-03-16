import {Component, Input, OnInit, Output, EventEmitter} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {WizardStep} from './wizard-step';
import {AuiNgWizardComponent} from './wizard.component';
import {WizardStepComponent} from './wizard-step-component';

@Component({
    selector: 'auiNgWizardStep',
    directives: [...FORM_DIRECTIVES],
    template: `
        <ng-content *ngIf="active"></ng-content>
    `
})
export class AuiNgWizardStepComponent implements WizardStep {

    private active: boolean = false;
    private data: any = {};
    private stepComponent: WizardStepComponent<any>;

    constructor(
        private auiNgWizardComponent: AuiNgWizardComponent
    ) {
        auiNgWizardComponent.registerStep(this);
    }

    register(stepComponent: WizardStepComponent<any>) {
        this.stepComponent = stepComponent;
    }

    getWizard(): AuiNgWizardComponent {
        return this.auiNgWizardComponent;
    }

    show() {
        if (this.stepComponent && !this.active && typeof this.stepComponent.init === 'function') {
            this.stepComponent.init();
        }
        this.active = true;
    }

    hide() {
        this.active = false;
    }

    isActive() {
        return this.active;
    }


    validate(): boolean {
        if (this.stepComponent && typeof this.stepComponent.validate === 'function') {
            return this.stepComponent.validate();
        }
        return true;
    }


    getData(): any {
        if (this.stepComponent && typeof this.stepComponent.getData === 'function') {
            return this.stepComponent.getData();
        }
        return this.data;
    }

    setData(data: any): void {
        if (this.stepComponent && typeof this.stepComponent.setData === 'function') {
            this.stepComponent.setData(data);
        }
        this.data = data;
    }

}
