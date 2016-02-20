import {CONST_EXPR} from 'angular2/src/facade/lang';
import {AuiNgDialogComponent} from './dialog/dialog.component';
import {AuiNgMessageDialogComponent} from './dialog/message-dialog.component';

import {AuiNgDialogService} from './dialog/dialog.service';
import {AuiNgDialogOptions} from './dialog/dialog-options';
import {AuiNgMessageType} from './dialog/message-dialog.component';

export {
    AuiNgDialogService,
    AuiNgDialogOptions,
    AuiNgMessageType,
    AuiNgDialogComponent,
    AuiNgMessageDialogComponent
};

export const AUI_NG2_DIRECTIVES = CONST_EXPR([AuiNgDialogComponent, AuiNgMessageDialogComponent]);
