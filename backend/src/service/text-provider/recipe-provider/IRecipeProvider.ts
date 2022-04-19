export type Ingredient = {
    amount: string;
    name: string;
}

export type Recipe = {
    ingredients: Ingredient[];
    description: string;
}

export default interface IRecipeProvider {
    getRecipe(url: string): Promise<Recipe>
}
