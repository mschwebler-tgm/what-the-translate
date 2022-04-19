import ITranslationProvider from '@service/translation-provider/ITranslationProvider';
import {Translate} from 'aws-sdk';

export default class AwsTranslationProvider implements ITranslationProvider {
    private readonly translator: Translate;

    constructor(translator: Translate) {
        this.translator = translator;
    }

    async translate(text: string, targetLanguages: string[]): Promise<string> {
        const result = await this.translator.translateText({
            Text: text,
            SourceLanguageCode: 'de',
            TargetLanguageCode: 'en',
            Settings: {
                Formality: 'FORMAL',
            },
        }).promise();
        return result.TranslatedText;
    }

}
