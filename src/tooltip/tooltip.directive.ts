import {AJS} from '../common/libs/aui';
import {AfterViewInit, Directive, ElementRef} from '@angular/core';

@Directive({
    selector: '[auiNgTooltip]'
})
export class AuiNgTooltipDirective implements AfterViewInit {

    constructor(
        private elementRef: ElementRef
    ) {}

    ngAfterViewInit() {
        AJS.$(this.elementRef.nativeElement).tooltip();
    }
}
