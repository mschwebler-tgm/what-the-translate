import ITranslationProvider from '@service/translation-provider/ITranslationProvider';
import {injectable} from 'inversify';
import {Translate} from '@google-cloud/translate/build/src/v2';

@injectable()
export default class GoogleTranslationProvider implements ITranslationProvider {
    private readonly translator: Translate;

    constructor(translator: Translate) {
        this.translator = translator;
    }

    async translate(text: string, targetLanguages: string[]): Promise<string> {
        const [result] = await this.translator.translate(text, 'ru');  // TODO use lang parameter
        return result;
    }

}
