import AbstractTranslationResultResponse from './AbstractTranslationResultResponse';

export default class ChefkochTranslationResultResponse extends AbstractTranslationResultResponse {
  ingredients!: string;
  description!: string;
}
