import AbstractTranslationRequest from './request/requests/AbstractTranslationRequest';
import TranslationService from '@service/TranslationService';

export default class TranslationController {
  private readonly translationService: TranslationService;

  constructor(translationService: TranslationService) {
    this.translationService = translationService;
  }

  async translate(request: AbstractTranslationRequest): Promise<any> {
    return this.translationService.translate(
        request.type,
        request.sourceLanguageCode,
        request.getTextProvider(),
        request.getTargetLanguages(),
    );
  }
}
