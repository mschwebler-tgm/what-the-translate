import { IsUrl } from 'class-validator';
import AbstractTranslationSourceRequest from './AbstractTranslationSourceRequest';

export default class ChefkochTranslationSourceRequest extends AbstractTranslationSourceRequest {
  @IsUrl({}, {
    message: 'url missing in source object'
  })
  url!: string;
}
