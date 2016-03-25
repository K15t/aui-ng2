import './aui-styles';
import $ from './jquery';

// AUI needs global jQuery
let win: any = window;
win.jQuery = $;

let AJS : any = win.AJS;
export {AJS};

import '@atlassian/aui/lib/js/aui/tooltip';
