import ITranslationService from '@service/cloud-translation-services/ITranslationService';
import {injectable} from 'inversify';
import {Translate} from '@google-cloud/translate/build/src/v2';

@injectable()
export default class GoogleTranslationService implements ITranslationService {
    private readonly translator: Translate;

    constructor(translator: Translate) {
        this.translator = translator;
    }

    async translate(text: string, targetLanguages: string): Promise<string> {
        if (!text) {
            return text;
        }
        const [result] = await this.translator.translate(text, targetLanguages);
        return result;
    }

}
