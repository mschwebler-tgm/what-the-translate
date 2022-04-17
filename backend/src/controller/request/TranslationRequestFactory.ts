import {APIGatewayProxyEvent} from 'aws-lambda';
import ValidationError from '../../errors/ValidationError';
import AbstractTranslationRequest from './requests/AbstractTranslationRequest';
import {ClassConstructor} from 'class-transformer';
import SimpleTextTranslationRequest from './requests/SimpleTextTranslationRequest';
import ChefkochTranslationRequest from './requests/ChefkochTranslationRequest';
import {transformAndValidateSync} from 'class-transformer-validator';

const allTranslationTypes = ['simpleText', 'chefkoch'] as const;
type TranslationTypes = typeof allTranslationTypes; // readonly ['simpleText', 'chefkoch', ...]
export type TranslationType = TranslationTypes[number];  // "simpleText" | "chefkoch" | ...

type TranslationRequestClass = ClassConstructor<AbstractTranslationRequest>;

// noinspection JSMethodCanBeStatic
export default class TranslationRequestFactory {

    private readonly requestClassByType: Map<TranslationType, TranslationRequestClass> = new Map<TranslationType, TranslationRequestClass>([
        ['simpleText', SimpleTextTranslationRequest],
        ['chefkoch', ChefkochTranslationRequest],
    ]);

    parse(event: APIGatewayProxyEvent): AbstractTranslationRequest {
        const body = this.getBody(event);
        const requestType = body.type as TranslationType;
        if (!this.requestClassByType.has(requestType)) {
            throw new ValidationError(`Type must be one of the following: ${allTranslationTypes.join(', ')}`);
        }
        const requestClass = this.requestClassByType.get(requestType)
        try {
            return transformAndValidateSync(requestClass as ClassConstructor<AbstractTranslationRequest>, body);
        } catch (error) {
            throw new ValidationError(error);
        }
    }

    private getBody(event: APIGatewayProxyEvent): { type: unknown } {
        if (!event.body) {
            throw new ValidationError('Request body missing');
        }
        let body: { type: unknown };
        try {
            body = JSON.parse(event.body);
        } catch (error) {
            console.error(error);
            throw new ValidationError('Request body must be of type JSON');
        }
        if (Array.isArray(body)) {
            throw new ValidationError('Request body must be of type object');
        }
        if (!body.type) {
            throw new ValidationError('type missing in request body');
        }
        return body;
    }
}
