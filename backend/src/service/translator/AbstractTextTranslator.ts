import ITranslationService from '@service/cloud-translation-services/ITranslationService';
import {inject, injectable} from 'inversify';
import bindings from '@ioc/bindings';

@injectable()
export default abstract class AbstractTextTranslator<T> {
    protected readonly translationService: ITranslationService;

    constructor(@inject(bindings.TranslationService) translationService: ITranslationService) {
        this.translationService = translationService;
    }

    abstract translate(input: T, sourceLanguage: string, targetLanguage: string): Promise<T>;
}
