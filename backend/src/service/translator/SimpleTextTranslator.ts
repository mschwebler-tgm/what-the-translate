import ITextTranslator from '@service/translator/ITextTranslator';
import ITranslationService from '@service/cloud-translation-services/ITranslationService';
import {inject, injectable} from 'inversify';
import bindings from '@ioc/bindings';

@injectable()
export default class SimpleTextTranslator implements ITextTranslator<string> {
    private readonly translationService: ITranslationService;

    constructor(@inject(bindings.TranslationService) translationService: ITranslationService) {
        this.translationService = translationService;
    }

    async translate(input: string, sourceLanguage: string, targetLanguages: string[]): Promise<string> {
        const translation = await this.translationService.translate(input, sourceLanguage, targetLanguages[0]);
        console.log(`Text: ${input}`);
        console.log(`Translation: ${translation}`);

        return translation;
    }
}
