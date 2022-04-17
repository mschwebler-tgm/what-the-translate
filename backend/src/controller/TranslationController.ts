import TranslationRequest from './requests/TranslationRequest';
import TranslationResponse from './responses/TranslationResponse';
import { plainToInstance } from 'class-transformer';

export default class TranslationController {
  translate(request: TranslationRequest): TranslationResponse {
    console.log(request);
    return plainToInstance(TranslationResponse, {
      type: request.type,
      result: {
        ingredients: '',
        description: '',
      }
    })
  }
}
