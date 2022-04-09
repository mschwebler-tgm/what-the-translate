import { Language } from '@/components/translator/languages';

export type Ingredient = {
  amount: string;
  name: string;
}

export type Recipe = {
  ingredients: Ingredient[];
  description: string;
  language: Language;
}

export default interface IRecipeProvider {
  getRecipe(source: unknown): Promise<Recipe>
// eslint-disable-next-line semi
}
