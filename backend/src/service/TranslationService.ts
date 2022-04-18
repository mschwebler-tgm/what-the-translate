import ITextProvider from '@service/text-provider/ITextProvider';
import {TranslationType} from '@controller/request/TranslationRequestFactory';
import iocContainer from '@ioc/iocContainer';
import bindings from '@ioc/bindings';
import ITextTranslator from '@service/translator/ITextTranslator';

export default class TranslationService {
    async translate(type: TranslationType, textProvider: ITextProvider, targetLanguages: string[]) {
        const translator = iocContainer.get<(type: TranslationType) => ITextTranslator<unknown>>(bindings.TextTranslatorFactory)(type);
        return translator.translate(await textProvider.getTexts(), targetLanguages);
    }
}
