import ITextTranslator from '@service/translator/ITextTranslator';
import ITranslationService from '@service/cloud-translation-services/ITranslationService';
import {inject, injectable} from 'inversify';
import bindings from '@ioc/bindings';

@injectable()
export default class SimpleTextTranslator implements ITextTranslator<string> {
    private readonly translationProvider: ITranslationService;

    constructor(@inject(bindings.TranslationService) translationProvider: ITranslationService) {
        this.translationProvider = translationProvider;
    }

    async translate(input: string, targetLanguages: string[]): Promise<string> {
        const translation = await this.translationProvider.translate(input, ['ru']);
        console.log(`Text: ${input}`);
        console.log(`Translation: ${translation}`);

        return translation;
    }
}
