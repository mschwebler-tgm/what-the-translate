import ITranslationService from '@service/cloud-translation-services/ITranslationService';
import {Translate} from 'aws-sdk';

export default class AwsTranslationService implements ITranslationService {
    private readonly translator: Translate;

    constructor(translator: Translate) {
        this.translator = translator;
    }

    async translate(text: string, sourceLanguage: string, targetLanguage: string): Promise<string> {
        if (!text) {
            return text;
        }
        const result = await this.translator.translateText({
            Text: text,
            SourceLanguageCode: sourceLanguage,
            TargetLanguageCode: targetLanguage,
            Settings: {
                Formality: 'FORMAL',
            },
        }).promise();
        return result.TranslatedText;
    }

}
