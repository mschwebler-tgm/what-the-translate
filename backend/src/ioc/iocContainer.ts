import {Container} from 'inversify';
import bindings from './bindings';
import {RecipeSource} from '@controller/request/requests/RecipeTranslationRequest';
import ChefkochRecipeProvider from '@service/text-provider/recipe-provider/ChefkochRecipeProvider';
import {TranslationType} from '@controller/request/TranslationRequestFactory';
import SimpleTextTranslator from '@service/translator/SimpleTextTranslator';
import RecipeTranslator from '@service/translator/RecipeTranslator';
import GoogleTranslationService from '@service/cloud-translation-services/GoogleTranslationService';
import {Translate as GoogleTranslate} from '@google-cloud/translate/build/src/v2';
import {Translate as AwsTranslate} from 'aws-sdk';
import AwsTranslationService from '@service/cloud-translation-services/AwsTranslationService';
import S3TranslationRepository from '../persistence/s3/S3TranslationRepository';
import TranslationService from '@service/TranslationService';
import TranslationController from '@controller/TranslationController';
import {S3} from 'aws-sdk';

const iocContainer = new Container();

iocContainer.bind(SimpleTextTranslator).toSelf();
iocContainer.bind(RecipeTranslator).toSelf();
iocContainer.bind(TranslationService).toSelf();
iocContainer.bind(TranslationController).toSelf();
iocContainer.bind(S3TranslationRepository).toDynamicValue(() => new S3TranslationRepository(new S3()));
iocContainer.bind(bindings.TranslationRepository).toDynamicValue(context => context.container.get(S3TranslationRepository));
iocContainer.bind(bindings.TranslationService).toDynamicValue(() => {
    if (process.env.DEFAULT_TRANSLATION_SERVICE === 'google') {
        const translator = new GoogleTranslate({projectId: process.env.GOOGLE_PROJECT_ID});
        return new GoogleTranslationService(translator);
    } else if (process.env.DEFAULT_TRANSLATION_SERVICE === 'aws') {
        const translator = new AwsTranslate();
        return new AwsTranslationService(translator);
    }
    throw new Error(`Cannot resolve translation service: "${process.env.DEFAULT_TRANSLATION_SERVICE}"`)
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
