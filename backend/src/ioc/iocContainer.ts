import {Container} from 'inversify';
import bindings from './bindings';
import {RecipeSource} from '@controller/request/requests/RecipeTranslationRequest';
import ChefkochRecipeProvider from '@service/text-provider/recipe-provider/ChefkochRecipeProvider';
import {TranslationType} from '@controller/request/TranslationRequestFactory';
import SimpleTextTranslator from '@service/translator/SimpleTextTranslator';
import RecipeTranslator from '@service/translator/RecipeTranslator';

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
});
iocContainer.bind(bindings.TextTranslatorFactory).toFactory(() => {
    return (type: TranslationType) => {
        const translatorClass = {
            simpleText: SimpleTextTranslator,
            recipe: RecipeTranslator,
        }[type];
        if (!translatorClass) {
            throw new Error(`Cannot find translator for type "${type}"`);
        }

        return new translatorClass();
    }
});

export default iocContainer;
