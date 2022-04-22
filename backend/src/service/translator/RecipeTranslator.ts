import AbstractTextTranslator from '@service/translator/AbstractTextTranslator';
import {Recipe} from '@service/text-provider/recipe-provider/IRecipeProvider';
import {injectable} from 'inversify';

@injectable()
export default class RecipeTranslator extends AbstractTextTranslator<Recipe> {

    async translate(sourceRecipe: Recipe, sourceLanguage: string, targetLanguage: string): Promise<Recipe> {
        const translatedDescriptionPromise = this.translateDescription(sourceRecipe, sourceLanguage, targetLanguage);
        const translatedIngredientsPromises = this.translateIngredients(sourceRecipe, sourceLanguage, targetLanguage);

        const [translatedIngredients, translatedDescription] = await Promise.all([
            Promise.all(translatedIngredientsPromises),
            translatedDescriptionPromise,
        ]);

        return {
            description: translatedDescription,
            ingredients: translatedIngredients.map(([amount, name]) => ({
                amount,
                name,
            })),
        };
    }

    private async translateDescription(recipe: Recipe, sourceLanguage: string, targetLanguage: string): Promise<string> {
        return this.translationService.translate(recipe.description, sourceLanguage, targetLanguage);
    }

    private translateIngredients(recipe: Recipe, sourceLanguage: string, targetLanguage: string): Promise<[string, string]>[] {
        const translatedIngredientsPromises: Promise<[string, string]>[] = [];
        for (const ingredient of recipe.ingredients) {
            translatedIngredientsPromises.push(Promise.all([
                this.translationService.translate(ingredient.amount, sourceLanguage, targetLanguage),
                this.translationService.translate(ingredient.name, sourceLanguage, targetLanguage),
            ]));
        }
        return translatedIngredientsPromises;
    }
}
