import AbstractTranslationRequest from './request/requests/AbstractTranslationRequest';
import TranslationService from '@service/TranslationService';
import {inject, injectable} from 'inversify';

@injectable()
export default class TranslationController {
  private readonly translationService: TranslationService;

  constructor(@inject(TranslationService) translationService: TranslationService) {
    this.translationService = translationService;
  }

  async translate(request: AbstractTranslationRequest): Promise<any> {
    return this.translationService.startTranslationJob(
        request.type,
        request.sourceLanguageCode,
        request.getTextProvider(),
        request.getTargetLanguageCodes(),
    );
  }
}
