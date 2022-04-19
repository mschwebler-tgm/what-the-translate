import ITextTranslator from '@service/translator/ITextTranslator';
import {Ingredient, Recipe} from '@service/text-provider/recipe-provider/IRecipeProvider';
import {inject, injectable} from 'inversify';
import bindings from '@ioc/bindings';
import ITranslationService from '@service/cloud-translation-services/ITranslationService';

@injectable()
export default class RecipeTranslator implements ITextTranslator<Recipe> {
    private readonly translationService: ITranslationService;

    constructor(@inject(bindings.TranslationService) translationService: ITranslationService) {
        this.translationService = translationService;
    }

    async translate(recipe: Recipe, targetLanguages: string[]): Promise<Recipe> {
        const translatedIngredients: Ingredient[] = [];
        const translatedDescription = await this.translationService.translate(recipe.description, targetLanguages[0]);
        for (const ingredient of recipe.ingredients) {
            translatedIngredients.push({
                amount: await this.translationService.translate(ingredient.amount, targetLanguages[0]),
                name: await this.translationService.translate(ingredient.name, targetLanguages[0]),
            });
        }

        return {
            ingredients: translatedIngredients,
            description: translatedDescription,
        }
    }
}
