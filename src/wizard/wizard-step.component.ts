import {Component, Input, OnInit, Output, EventEmitter} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {WizardStep} from './wizard-step';
import {AuiNgWizardComponent} from './wizard.component';

@Component({
    selector: 'auiNgWizardStep',
    directives: [...FORM_DIRECTIVES],
    template: `
        <ng-content *ngIf="active" (onUpdateDialog)="updateDialog($event)"></ng-content>
    `
})
export class AuiNgWizardStepComponent implements WizardStep {

    private active: boolean = false;
    private data: any = {};

    constructor(
        private auiNgWizardComponent: AuiNgWizardComponent
    ) {
        auiNgWizardComponent.registerStep(this);
    }


    show() {
        this.active = true;
    }

    hide() {
        this.active = false;
    }

    isActive() {
        return this.active;
    }


    validate(): boolean {
        return true;
    }


    getData(): any {
        return this.data;
    }

    setData(data: any): void {
        this.data = data;
    }

}
