import ITextTranslator from '@service/translator/ITextTranslator';
import ITranslationProvider from '@service/translation-provider/ITranslationProvider';
import {inject, injectable} from 'inversify';
import bindings from '@ioc/bindings';

@injectable()
export default class SimpleTextTranslator implements ITextTranslator<string> {
    private readonly translationProvider: ITranslationProvider;

    constructor(@inject(bindings.TranslationProvider) translationProvider: ITranslationProvider) {
        this.translationProvider = translationProvider;
    }

    async translate(input: string, targetLanguages: string[]): Promise<string> {
        const translation = await this.translationProvider.translate(input, ['ru']);
        console.log(`Text: ${input}`);
        console.log(`Translation: ${translation}`);

        return translation;
    }
}
