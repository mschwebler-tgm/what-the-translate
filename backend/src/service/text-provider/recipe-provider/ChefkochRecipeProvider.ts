import IRecipeProvider, {
    Ingredient,
    Recipe,
} from './IRecipeProvider';
import axios from 'axios';
import {injectable} from 'inversify';
import { parse } from 'node-html-parser';
import HTMLElement from 'node-html-parser/dist/nodes/html';

// noinspection JSMethodCanBeStatic
@injectable()
export default class ChefkochRecipeProvider implements IRecipeProvider {

    async getRecipe(chefkochUrl: string): Promise<Recipe> {
        const recipeDocument = await this.fetchRecipeDocument(chefkochUrl);
        const ingredients = this.parseIngredients(recipeDocument);
        const description = this.parseDescription(recipeDocument);

        return {
            ingredients,
            description,
        };
    }

    private async fetchRecipeDocument(chefkochUrl: string): Promise<HTMLElement> {
        const chefkochResponse = await axios.get(chefkochUrl);
        const recipePageHtml: string = chefkochResponse.data;
        return parse(recipePageHtml);
    }

    private parseIngredients(recipeDocument: HTMLElement): Ingredient[] {
        const ingredients: Ingredient[] = [];
        const ingredientTables = recipeDocument.querySelectorAll('.ingredients.table-header');
        if (ingredientTables.length === 0) {
            throw new Error('Couldn\'t find ingredients table(s)');
        }
        ingredientTables.forEach(ingredientTable => {
            const ingredientRows = ingredientTable.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
            ingredientRows.forEach((row) => {
                const rowCells = row.getElementsByTagName('td');
                if (rowCells.length !== 2) {
                    throw new Error(`Expected 2 "td" elements in ingredients row. Received ${rowCells.length}`);
                }
                ingredients.push({
                    amount: this.trimInnerText(rowCells[0].innerText),
                    name: this.trimInnerText(rowCells[1].innerText),
                });
            });
        });

        return ingredients;
    }

    private trimInnerText(text: string): string {
        return text.replace(/\n/g, '').trim();
    }

    private parseDescription(recipeDocument: HTMLElement): string {
        const metaElement = recipeDocument.querySelectorAll('.ds-recipe-meta.rds-recipe-meta')[0];
        if (!metaElement) {
            throw new Error('Could not find recipe description meta element.');
        }
        const descriptionElement = metaElement.nextElementSibling;
        if (!descriptionElement) {
            throw new Error('Cannot find description element by meta element.');
        }
        const descriptionElementHtml = descriptionElement.innerHTML;

        return descriptionElementHtml.replace(/<br>/g, '').trim();
    }
}
