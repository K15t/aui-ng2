import {Component, AfterViewInit, Directive, ElementRef} from 'angular2/core';

/**
 * Directive to move the focus to element where the directive it defined as attribute.
 */
@Directive({
    selector: '[auiNgAutoFocus]'
})
export class AuiNgAutoFocus implements AfterViewInit {

    constructor(
        private elementRef: ElementRef
    ) {}

    ngAfterViewInit() {
        this.setFocus();
    }

    setFocus() {
        this.elementRef.nativeElement.focus();
    }
}
