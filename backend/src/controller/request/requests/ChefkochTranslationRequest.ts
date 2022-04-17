import AbstractTranslationRequest from './AbstractTranslationRequest';
import ITextProvider from '@service/text-provider/ITextProvider';
import ChefkochTextProvider from '@service/text-provider/ChefkochTextProvider';
import {IsDefined, IsString, IsUrl} from 'class-validator';

export default class ChefkochTranslationRequest extends AbstractTranslationRequest {

    @IsDefined({message: 'url missing from request body'})
    @IsString({message: 'url must be of type string'})
    @IsUrl({}, {message: 'url must be a valid URL'})
    url!: string;

    getTextProvider(): ITextProvider {
        return new ChefkochTextProvider();  // TODO add inversify (get provider by type)
    }

}
