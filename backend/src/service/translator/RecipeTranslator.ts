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

    async translate(sourceRecipe: Recipe, targetLanguages: string[]): Promise<Recipe> {
        let recipe = sourceRecipe;
        const languages = ['de', ...targetLanguages,'de'];
        for (let i = 1; i < languages.length; i++) {
            const sourceLanguage = languages[i-1];
            const targetLanguage = languages[i];

            const translatedIngredientsPromises: Promise<[string, string]>[] = [];
            const translatedDescriptionPromise = await this.translationService.translate(recipe.description, targetLanguage, sourceLanguage);
            for (const ingredient of recipe.ingredients) {
                const translatedIngredient = Promise.all([
                    this.translationService.translate(ingredient.amount, targetLanguage, sourceLanguage),
                    this.translationService.translate(ingredient.name, targetLanguage, sourceLanguage),
                ]);
                translatedIngredientsPromises.push(translatedIngredient);
            }

            const [translatedIngredients, translatedDescription] = await Promise.all([
                Promise.all(translatedIngredientsPromises),
                translatedDescriptionPromise,
            ]);

            recipe = {
                ingredients: translatedIngredients.map(([amount, name]) => ({
                    amount,
                    name,
                })),
                description: translatedDescription,
            };
        }

        return recipe;
    }
}
