import ITranslationService from '@service/cloud-translation-services/ITranslationService';
import {inject, injectable} from 'inversify';
import bindings from '@ioc/bindings';

@injectable()
export default abstract class AbstractTextTranslator<T> {
    protected readonly translationService: ITranslationService;

    constructor(@inject(bindings.TranslationService) translationService: ITranslationService) {
        this.translationService = translationService;
    }

    abstract translate(input: T, sourceLanguage: string, targetLanguages: string[]): Promise<T>;

    protected async cycleThroughLanguages(
        sourceLanguage: string,
        targetLanguages: string[],
        callback: (sourceLanguage: string, targetLanguage: string) => Promise<void>
    ): Promise<void> {
        const languages = [sourceLanguage, ...targetLanguages, sourceLanguage];
        for (let i = 1; i < languages.length; i++) {
            const sourceLanguage = languages[i-1];
            const targetLanguage = languages[i];
            await callback(sourceLanguage, targetLanguage);
        }
    }
}
