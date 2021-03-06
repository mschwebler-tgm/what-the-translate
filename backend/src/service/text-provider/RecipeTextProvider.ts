import ITextProvider from '@service/text-provider/ITextProvider';
import {RecipeSource} from '@controller/request/requests/RecipeTranslationRequest';
import IRecipeProvider, {Recipe} from '@service/text-provider/recipe-provider/IRecipeProvider';
import iocContainer from '@ioc/iocContainer';
import bindings from '@ioc/bindings';

export default class RecipeTextProvider implements ITextProvider<Recipe> {

    private readonly recipeProvider: IRecipeProvider;

    private readonly url: string;

    constructor(source: RecipeSource, url: string) {
        this.url = url;
        this.recipeProvider = iocContainer.get<(source: RecipeSource) => IRecipeProvider>(bindings.RecipeProviderFactory)(source);
    }

    async getTexts(): Promise<Recipe> {
        return this.recipeProvider.getRecipe(this.url);
    }
}
