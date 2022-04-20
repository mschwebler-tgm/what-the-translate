import ITextProvider from '@service/text-provider/ITextProvider';
import {TranslationType} from '@controller/request/TranslationRequestFactory';
import iocContainer from '@ioc/iocContainer';
import bindings from '@ioc/bindings';
import ITextTranslator from '@service/translator/ITextTranslator';

export default class TranslationService {
    async translate(
        type: TranslationType,
        sourceLanguageCode: string,
        textProvider: ITextProvider<unknown>,
        targetLanguages: string[],
    ) {
        const translator = this.getTranslator(type);
        return translator.translate(
            await textProvider.getTexts(),
            sourceLanguageCode,
            targetLanguages,
        );
    }

    // noinspection JSMethodCanBeStatic
    private getTranslator(type: TranslationType): ITextTranslator<unknown> {
        const translatorFactory = iocContainer.get<(type: TranslationType) => ITextTranslator<unknown>>(bindings.TextTranslatorFactory);
        return translatorFactory(type);
    }
}
