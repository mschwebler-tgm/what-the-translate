import ITextProvider from '@service/text-provider/ITextProvider';
import {TranslationType} from '@controller/request/TranslationRequestFactory';
import Translation from '../persistence/entities/Translation';
import ITranslationRepository from '../persistence/ITranslationRepository';
import {inject, injectable} from 'inversify';
import bindings from '@ioc/bindings';
import AbstractTextTranslator from '@service/translator/AbstractTextTranslator';
import iocContainer from '@ioc/iocContainer';

@injectable()
export default class TranslationService {
    private readonly translationRepository: ITranslationRepository<unknown>;

    constructor(@inject(bindings.TranslationRepository) translationRepository: ITranslationRepository<unknown>) {
        this.translationRepository = translationRepository;
    }

    async startTranslationJob(
        type: TranslationType,
        sourceLanguageCode: string,
        textProvider: ITextProvider<unknown>,
        targetLanguageCodes: string[],
    ): Promise<void> {
        const translation = new Translation();
        translation.type = type;
        translation.status = 'IN_PROGRESS';
        translation.originalText = await textProvider.getTexts();
        translation.sourceLanguage = sourceLanguageCode;
        translation.targetLanguages = [...targetLanguageCodes, sourceLanguageCode];

        await this.translationRepository.save(translation);
    }

    async translate(translation: Translation<unknown>): Promise<void> {
        if (translation.status === 'DONE') {
            console.log('Translation done.');
            return;
        }

        const targetLanguage = translation.targetLanguages.shift();
        let textToTranslate = translation.translatedText;
        if (!textToTranslate) {
            textToTranslate = translation.originalText;
        }
        console.log(`Translating to "${targetLanguage}"`)
        if (!targetLanguage) {
            await this.translationRepository.delete(translation);
            translation.status = 'DONE';
        } else {
            const translator = this.getTranslator(translation.type);
            translation.translatedText = await translator.translate(
                textToTranslate,
                translation.sourceLanguage,
                targetLanguage,
            );
            translation.sourceLanguage = targetLanguage;
        }

        await this.translationRepository.save(translation);
    }

    // noinspection JSMethodCanBeStatic
    private getTranslator(type: TranslationType): AbstractTextTranslator<unknown> {
        const translatorFactory = iocContainer.get<(type: TranslationType) => AbstractTextTranslator<unknown>>(bindings.TextTranslatorFactory);
        return translatorFactory(type);
    }
}
