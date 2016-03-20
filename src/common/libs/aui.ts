import './aui-styles';
import $ from './jquery';

// AUI needs global jQuery
let win: any = window;
win.jQuery = $;

import '@atlassian/aui/lib/js/aui/tooltip';
