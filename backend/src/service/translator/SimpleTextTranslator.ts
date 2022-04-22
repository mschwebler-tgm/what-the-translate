import AbstractTextTranslator from '@service/translator/AbstractTextTranslator';
import {injectable} from 'inversify';

@injectable()
export default class SimpleTextTranslator extends AbstractTextTranslator<string> {
    async translate(text: string, sourceLanguage: string, targetLanguage: string): Promise<string> {
        return await this.translationService.translate(text, sourceLanguage, targetLanguage);
    }
}
