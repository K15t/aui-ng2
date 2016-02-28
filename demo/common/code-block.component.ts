import {Component, Input, ViewChild, AfterViewInit} from 'angular2/core';

@Component({
    selector: 'auiNgCodeBlock',
    template: `
        <div style="padding-top: 15px">
            <h3>{{ title }}</h3>
            <div class="aui-ng2-code-block">
                <blockquote><pre #codeBlockContent ng-non-bindable><ng-content></ng-content></pre></blockquote>
            </div>
        </div>
    `
})
export class AuiNgCodeBlockComponent implements AfterViewInit {
    @Input() title: string;
    @ViewChild('codeBlockContent') codeBlockContent;

    private  htmlEscape(str) {
        return str.replace(/&/g, '&amp;')
            .replace(/>/g, '&gt;')
            .replace(/</g, '&lt;')
            .replace(/"/g, '&quot;')
            .replace(/_sb_/g, '(')
            .replace(/_eb_/g, ')')
            .replace(/'/g, '&#39;')
            .replace(/`/g, '&#96;')
            .trim();
    }

    ngAfterViewInit() {
        this.codeBlockContent.nativeElement.innerHTML = this.htmlEscape(this.codeBlockContent.nativeElement.innerHTML);
    }
}
