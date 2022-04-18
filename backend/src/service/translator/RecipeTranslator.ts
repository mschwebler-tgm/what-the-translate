import ITextTranslator from '@service/translator/ITextTranslator';
import {Recipe} from '@service/text-provider/recipe-provider/IRecipeProvider';

export default class RecipeTranslator implements ITextTranslator<Recipe> {
    translate(input: Recipe, targetLanguages: string[]): Promise<Recipe> {
        console.log(input);
        return Promise.resolve(input);
    }
}
