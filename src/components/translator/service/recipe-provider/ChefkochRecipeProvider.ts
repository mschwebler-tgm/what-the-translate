import IRecipeProvider, {
  Ingredient,
  Recipe,
} from '@/components/translator/service/recipe-provider/IRecipeProvider';
import axios from 'axios';

// noinspection JSMethodCanBeStatic
export default class ChefkochRecipeProvider implements IRecipeProvider {
  private readonly CORS_BYPASS_PROXY_URL = 'https://api.codetabs.com/v1/proxy/?quest=';

  async getRecipe(chefkochUrl: string): Promise<Recipe> {
    const recipeDocument = await this.fetchRecipeDocument(chefkochUrl);
    const ingredients = this.parseIngredients(recipeDocument);
    const description = this.parseDescription(recipeDocument);

    return {
      ingredients,
      description,
      language: { code: 'de', name: 'German' },
    };
  }

  private async fetchRecipeDocument(chefkochUrl: string): Promise<HTMLElement> {
    const chefkochResponse = await axios.get(this.CORS_BYPASS_PROXY_URL + chefkochUrl);
    const recipePageHtml: string = chefkochResponse.data;
    const recipeDocument = document.createElement('html');
    recipeDocument.innerHTML = recipePageHtml;

    return recipeDocument;
  }

  private parseIngredients(recipeDocument: HTMLElement) {
    const ingredientsTable = recipeDocument.getElementsByClassName('ingredients table-header')[0];
    if (!ingredientsTable) {
      throw new Error('Couldn\'t find ingredients table');
    }
    const ingredientRows = ingredientsTable.getElementsByTagName('tr');

    return [...ingredientRows].map((row): Ingredient => {
      const spans = row.getElementsByTagName('span');
      if (spans.length !== 2) {
        throw new Error(`Expected 2 "span" elements in ingredients row. Received ${spans.length}`);
      }
      return {
        amount: this.trimInnerText(spans[0].innerText),
        name: this.trimInnerText(spans[1].innerText),
      };
    });
  }

  private trimInnerText(text: string): string {
    return text.replaceAll('\n', '').replaceAll(' ', '');
  }

  private parseDescription(recipeDocument: HTMLElement): string {
    const metaElement = recipeDocument.getElementsByClassName('ds-recipe-meta rds-recipe-meta')[0];
    if (!metaElement) {
      throw new Error('Could not find recipe description meta element.');
    }
    const descriptionElement = metaElement.nextElementSibling;
    if (!descriptionElement) {
      throw new Error('Cannot find description element by meta element.');
    }
    const descriptionElementHtml = descriptionElement.innerHTML;

    return descriptionElementHtml.replaceAll('<br>', '').trim();
  }
}
