import {Component, Input, OnInit, Output, EventEmitter} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {WizardStep} from './wizard-step';

/**
 * Component to build a wizard on a page or as part of a modal dialog.
 *
 * Example to build a wizard dialog:
 *
 * <auiNgDialog title="My dialog" dialogClass="aui-ng-dialog-medium" (onDialogClose)="close($event)">
 *   <auiNgDialogContent>
 *     <auiNgWizard navigation="true">
 *       <auiNgWizardStep>
 *           <div>Content for Step 1</div>
 *       </auiNgWizardStep>
 *       <auiNgWizardStep>
 *           <div>Content for Step 2</div>
 *       </auiNgWizardStep>
 *       <auiNgWizardStep>
 *           <div>Content for Step 3</div>
 *       </auiNgWizardStep>
 *     </auiNgWizard>
 *   </auiNgDialogContent>
 *   <auiNgDialogFooter>
 *       ...
 *   </auiNgDialogFooter>
 * </auiNgDialog>
 */
@Component({
    selector: 'auiNgWizard',
    directives: [...FORM_DIRECTIVES],
    styles: [`
        .aui-ng-nav-item {
            float: left;
        }
    `],
    template: `
        <div (onResetTabs)="reset($event)">
            <ng-content></ng-content>
            <div *ngIf="navigation == 'true'">
                <button (click)="previous()" *ngIf="indexCurrentStep > 0" class="aui-button aui-ng-nav-item">Previous</button>
                <button (click)="next()" *ngIf="indexCurrentStep <= steps.length -1" class="aui-button aui-ng-nav-item">Next</button>
            </div>
        </div>
    `
})
export class AuiNgWizardComponent implements OnInit {

    @Input() navigation: boolean = true;
    @Output() next: EventEmitter<WizardStep> = new EventEmitter(false);
    @Output() previous: EventEmitter<WizardStep> = new EventEmitter(false);

    private steps: Array<WizardStep> = [];
    private indexCurrentStep: number = 0;

    registerStep(step: WizardStep) {
        this.steps.push(step);
    }

    ngOnInit() {
        this.steps[0].show();
        this.indexCurrentStep = 0;
    }

    reset() {
        this.steps = [];
        this.indexCurrentStep = 0;
    }

    getActiveTab(): WizardStep {
        return this.steps[this.indexCurrentStep];
    }

    getCurrentIndex(): number {
        return this.indexCurrentStep;
    }

    next() {
        if (this.indexCurrentStep < this.steps.length - 1 && this.steps[this.indexCurrentStep].validate()) {
            let data = this.steps[this.indexCurrentStep].getData();
            this.steps[this.indexCurrentStep].hide();
            this.steps[this.indexCurrentStep + 1].setData(data);
            this.steps[this.indexCurrentStep + 1].show();
            this.indexCurrentStep++;
            this.next.emit(this.steps[this.indexCurrentStep]);
        }
    }

    previous() {
        if (this.indexCurrentStep > 0 && this.steps.length - 1 && this.steps[this.indexCurrentStep].validate()) {
            let data = this.steps[this.indexCurrentStep].getData();
            this.steps[this.indexCurrentStep].hide();
            this.steps[this.indexCurrentStep - 1].setData(data);
            this.steps[this.indexCurrentStep - 1].show();
            this.indexCurrentStep--;
            this.previous.emit(this.steps[this.indexCurrentStep]);
        }
    }

    isLastStep() {
        return this.indexCurrentStep === this.steps.length - 1;
    }

}

