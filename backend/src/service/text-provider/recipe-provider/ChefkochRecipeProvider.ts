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

    private parseIngredients(recipeDocument: HTMLElement) {
        console.log(recipeDocument.querySelectorAll('.ingredients.table-header'));
        const ingredientsTable = recipeDocument.querySelectorAll('.ingredients.table-header')[0];
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
        return text.replace(/\n/g, '').replace(/ /, '');
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
