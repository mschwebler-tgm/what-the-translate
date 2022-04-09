import { Language } from '@/components/translator/languages';
import IRecipeProvider, {
  Recipe,
} from '@/components/translator/service/recipe-provider/IRecipeProvider';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// import translate from 'translate/src';
import { setCORS } from 'google-translate-api-browser';

export default class Translator {
  private languages: Language[] = [
    { name: 'slovak', code: 'sk' },
    { name: 'chinese', code: 'zh' },
    { name: 'somali', code: 'so' },
    { name: 'sindhi', code: 'sd' },
    { name: 'thai', code: 'th' },
    { name: 'swedish', code: 'sv' },
    { name: 'russian', code: 'ru' },
    { name: 'portuguese', code: 'pt' },
    { name: 'chichewa', code: 'ny' },
    { name: 'norwegian', code: 'no' },
    { name: 'afrikaans', code: 'af' },

    { name: 'japanese', code: 'ja' },
    { name: 'arabic', code: 'ar' },
    { name: 'belarusian', code: 'be' },
    { name: 'bulgarian', code: 'bg' },
    { name: 'chinese', code: 'zh' },
    { name: 'czech', code: 'cs' },
    { name: 'dutch', code: 'nl' },
    { name: 'welsh', code: 'cy' },
    { name: 'french', code: 'fr' },
    { name: 'esperanto', code: 'eo' },
    { name: 'irish', code: 'ga' },
    { name: 'haitian', code: 'ht' },
    { name: 'hindi', code: 'hi' },
    { name: 'hungarian', code: 'hu' },
    { name: 'indonesian', code: 'id' },
    { name: 'italian', code: 'it' },
    { name: 'korean', code: 'ko' },
    { name: 'latin', code: 'la' },
    { name: 'maori', code: 'mi' },
    { name: 'polish', code: 'pl' },
    { name: 'spanish', code: 'es' },
    { name: 'turkish', code: 'tr' },
    { name: 'urdu', code: 'ur' },
    { name: 'vietnamese', code: 'vi' },
    { name: 'zulu', code: 'zu' },
  ];

  private recipeProvider: IRecipeProvider;

  constructor(recipeProvider: IRecipeProvider) {
    this.recipeProvider = recipeProvider;
  }

  public async translate(source: unknown) {
    const recipe = await this.recipeProvider.getRecipe(source);
    return this.translateThroughAllLanguages(recipe);
  }

  private async translateThroughAllLanguages(recipe: Recipe): Promise<Recipe> {
    const translate = setCORS('https://cors-anywhere.herokuapp.com/');
    let { description } = recipe;
    let recipeLanguage = recipe.language;
    const targetLanguages: Language[] = [...this.languages, recipe.language];
    for (let i = 0; i < targetLanguages.length; i += 1) {
      const targetLanguage = targetLanguages[i];
      // eslint-disable-next-line no-await-in-loop
      const translationResult = await translate(recipe.description, {
        from: recipeLanguage.code,
        to: targetLanguage.code,
      });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      description = translationResult.text;
      recipeLanguage = targetLanguage;
    }

    return {
      language: recipeLanguage,
      description,
      ingredients: recipe.ingredients,
    };
  }
}
