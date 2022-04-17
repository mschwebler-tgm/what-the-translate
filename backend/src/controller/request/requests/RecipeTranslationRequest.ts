import AbstractTranslationRequest from './AbstractTranslationRequest';
import ITextProvider from '@service/text-provider/ITextProvider';
import {IsDefined, IsIn, IsString, IsUrl} from 'class-validator';
import RecipeTextProvider from '@service/text-provider/RecipeTextProvider';

const allSources = ['chefkoch'] as const;
type RecipeSources = typeof allSources; // readonly ['chefkoch', ...]
export type RecipeSource = RecipeSources[number];  // "simpleText" | "chefkoch" | ...

export default class RecipeTranslationRequest extends AbstractTranslationRequest {

    @IsDefined({message: 'source missing from request body'})
    @IsString({message: 'source must be of type string'})
    @IsIn(allSources, {message: `source must be one of: ${allSources.join(', ')}`})
    source!: RecipeSource;

    @IsDefined({message: 'url missing from request body'})
    @IsString({message: 'url must be of type string'})
    @IsUrl({}, {message: 'url must be a valid URL'})
    url!: string;

    getTextProvider(): ITextProvider {
        return new RecipeTextProvider(this.source, this.url);
    }

}
