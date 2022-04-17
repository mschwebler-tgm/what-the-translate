import {Container} from 'inversify';
import bindings from './bindings';
import {RecipeSource} from '@controller/request/requests/RecipeTranslationRequest';
import ChefkochRecipeProvider from '@service/text-provider/recipe-provider/ChefkochRecipeProvider';

const iocContainer = new Container();

iocContainer.bind(bindings.RecipeProviderFactory).toFactory(() => {
    return (source: RecipeSource) => {
        const providerClass = {
            chefkoch: ChefkochRecipeProvider,
        }[source];
        if (!providerClass) {
            throw new Error(`Cannot find recipe provider for source "${source}"`);
        }

        return new providerClass();
    }
})

export default iocContainer;
