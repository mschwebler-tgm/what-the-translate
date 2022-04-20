import AbstractTextTranslator from '@service/translator/AbstractTextTranslator';
import {injectable} from 'inversify';

@injectable()
export default class SimpleTextTranslator extends AbstractTextTranslator<string> {
    async translate(input: string, sourceLanguage: string, targetLanguages: string[]): Promise<string> {
        let translation = input;
        await this.cycleThroughLanguages(sourceLanguage, targetLanguages, async (sourceLanguage, targetLanguage) => {
            translation = await this.translationService.translate(translation, sourceLanguage, targetLanguage);
        });

        return translation;
    }
}
