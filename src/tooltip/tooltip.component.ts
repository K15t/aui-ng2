import '../common/libs/aui';
import $ from '../common/libs/jquery';

import {Component, AfterViewInit, Directive, ElementRef} from 'angular2/core';

@Directive({
    selector: '[auiNgTooltip]'
})
export class AuiNgTooltipComponent implements AfterViewInit {

    constructor(
        private elementRef: ElementRef
    ) {}

    ngAfterViewInit() {
        $(this.elementRef.nativeElement).tooltip();
    }
}
