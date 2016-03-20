import '../common/libs/aui';
import $ from '../common/libs/jquery';
import {Component, AfterViewInit, Directive, ElementRef} from 'angular2/core';

@Directive({
    selector: '[auiNgTooltip]'
})
export class AuiNgTooltipDirective implements AfterViewInit {

    constructor(
        private elementRef: ElementRef
    ) {}

    ngAfterViewInit() {
        let jquery: any = $(this.elementRef.nativeElement);
        jquery.tooltip();
    }
}
