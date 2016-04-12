import {Injectable} from 'angular2/core';
import {TranslateService} from 'ng2-translate/ng2-translate';

@Injectable()
export class AuiNgTranslations {
    constructor (translate : TranslateService) {
        const langs = translate.getLangs();

        // en
        if (langs.indexOf('en') !== -1) {
            translate.set('auing.close', 'close', 'en');
        }

        // de
        if (langs.indexOf('de') !== -1) {
            translate.set('auing.close', 'schließen', 'de');
        }
    }
}
