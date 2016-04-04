import {Component, Input, ViewChild, AfterViewInit} from 'angular2/core';
const CodeMirror = require('codemirror');
require('codemirror/lib/codemirror.css');
require('codemirror/mode/htmlmixed/htmlmixed');
require('codemirror/mode/javascript/javascript');

@Component({
    selector: 'auiNgCodeBlock',
    template: `
        <div style="padding-top: 15px">
            <h3>{{ title }}</h3>
            <div class="aui-ng2-code-block">
              <div #codeBlockContent ng-non-bindable><ng-content></ng-content></div>
            </div>
        </div>
    `
})
export class AuiNgCodeBlockComponent implements AfterViewInit {
    @Input() title:string;
    @Input() lang:string;
    @ViewChild('codeBlockContent') codeBlockContent;

    ngAfterViewInit() {
        let textarea = this.codeBlockContent.nativeElement.querySelector('textarea');

        if (textarea) {
            CodeMirror.fromTextArea(textarea, {
                mode: this.getMode(),
                readOnly: true
            });
        }
    }

    getMode() {
        switch (this.lang) {
            case 'html':
                return 'htmlmixed';
            case 'javascript':
                return 'javascript';
            default:
                return 'htmlmixed';
        }
    }
}
