import AbstractTranslationRequest from './request/requests/AbstractTranslationRequest';

export default class TranslationController {
  async translate(request: AbstractTranslationRequest): Promise<any> {
    return {
      test: await request.getTextProvider().getTexts(),
    }
  }
}
