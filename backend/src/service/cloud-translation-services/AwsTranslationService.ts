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

        try {
            return await this.translateText(text, sourceLanguage, targetLanguage);
        } catch (error) {
            if (error.code === 'ThrottlingException' && error.retryable === true) {
                await this.sleep(1);
                return this.translate(text, sourceLanguage, targetLanguage);
            }
            throw error;
        }
    }

    private async translateText(text: string, sourceLanguage: string, targetLanguage: string): Promise<string> {
        const result = await this.translator.translateText({
            Text: text,
            SourceLanguageCode: sourceLanguage,
            TargetLanguageCode: targetLanguage,
        }).promise();

        return result.TranslatedText;
    }

    private sleep(seconds: number): Promise<void> {
        return new Promise<void>(resolve => setTimeout(resolve, seconds * 1000));
    }

}
