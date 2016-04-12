import {Injectable} from 'angular2/core';
import {TranslateService} from 'ng2-translate/ng2-translate';

@Injectable()
export class AuiNgTranslations {

    constructor(private translate:TranslateService) {
        this.extendTranslation('de');
        this.extendTranslation('en');
    }

    extendTranslation(lang:string) {
        if (this.translate.getLangs().indexOf(lang) !== -1) {
            var translation = require('../../../assets/i18n/' + lang + '.json');

            for (var key in translation) {
                this.translate.set(key, translation[key], lang);
            }
        }
    }
}
