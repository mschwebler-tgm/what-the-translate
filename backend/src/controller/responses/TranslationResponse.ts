import { TRANSLATION_TYPE } from '../requests/TranslationRequest';
import AbstractTranslationResultResponse from './translation-results/AbstractTranslationResultResponse';

export default class TranslationResponse<T extends AbstractTranslationResultResponse = AbstractTranslationResultResponse> {
  type!: TRANSLATION_TYPE;
  result!: AbstractTranslationResultResponse;

  constructor(type: TRANSLATION_TYPE, result: T) {
    this.type = type;
    this.result = result;
  }
}
