import {Container} from 'inversify';
import bindings from './bindings';
import {RecipeSource} from '@controller/request/requests/RecipeTranslationRequest';
import ChefkochRecipeProvider from '@service/text-provider/recipe-provider/ChefkochRecipeProvider';
import {TranslationType} from '@controller/request/TranslationRequestFactory';
import SimpleTextTranslator from '@service/translator/SimpleTextTranslator';
import RecipeTranslator from '@service/translator/RecipeTranslator';
import GoogleTranslationProvider from '@service/translation-provider/GoogleTranslationProvider';
import {Translate as GoogleTranslate} from '@google-cloud/translate/build/src/v2';

const iocContainer = new Container();

iocContainer.bind(SimpleTextTranslator).toSelf();
iocContainer.bind(RecipeTranslator).toSelf();
iocContainer.bind(bindings.TranslationProvider).toDynamicValue(() => {
    const translate = new GoogleTranslate({projectId: process.env.GOOGLE_PROJECT_ID});
    return new GoogleTranslationProvider(translate);
});

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
iocContainer.bind(bindings.TextTranslatorFactory).toFactory((context) => {
    return (type: TranslationType) => {
        const textTranslatorFactoryByType = {
            simpleText: () => context.container.get(SimpleTextTranslator),
            recipe: () => context.container.get(RecipeTranslator),
        };
        const textTranslatorFactory = textTranslatorFactoryByType[type];
        if (!textTranslatorFactory) {
            throw new Error(`Cannot find translator for type "${type}"`);
        }

        return textTranslatorFactory();
    }
});

export default iocContainer;
