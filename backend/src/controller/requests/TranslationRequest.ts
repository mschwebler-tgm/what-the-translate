import { IsEnum } from 'class-validator';
import AbstractTranslationSourceRequest from './translation-sources/AbstractTranslationSourceRequest';
import { Type } from 'class-transformer';
import ChefkochTranslationSourceRequest from './translation-sources/ChefkochTranslationSourceRequest';

export enum TRANSLATION_TYPE {
  CHEFKOCH = 'chefkoch',
}

export default class TranslationRequest<T extends AbstractTranslationSourceRequest = AbstractTranslationSourceRequest> {
  @IsEnum(TRANSLATION_TYPE, {
    message: `type missing. Must be one of the following values: ${Object.values(TRANSLATION_TYPE)}`
  })
  type!: TRANSLATION_TYPE;

  @Type(() => AbstractTranslationSourceRequest, {
    discriminator: {
      property: 'type',
      subTypes: [
        { value: ChefkochTranslationSourceRequest, name: TRANSLATION_TYPE.CHEFKOCH },
      ],
    },
  })
  source!: T;
}
