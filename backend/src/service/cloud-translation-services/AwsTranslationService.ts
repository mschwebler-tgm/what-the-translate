import ITranslationService from '@service/cloud-translation-services/ITranslationService';
import {Translate} from 'aws-sdk';

export default class AwsTranslationService implements ITranslationService {
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
