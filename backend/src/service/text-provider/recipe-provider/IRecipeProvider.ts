export type Ingredient = {
    amount: string;
    name: string;
}

export type Recipe = {
    ingredients: Ingredient[];
    description: string;
    language: { code: string, name: string };
}

export default interface IRecipeProvider {
    getRecipe(url: string): Promise<Recipe>
}
