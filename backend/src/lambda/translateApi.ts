import 'reflect-metadata';
import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';
import TranslationRequestFactory from '@controller/request/TranslationRequestFactory';
import TranslationController from '@controller/TranslationController';
import ValidationError from '@errors/ValidationError';

export default async function translateApi(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  try {
    const requestFactory = new TranslationRequestFactory();
    const request = requestFactory.parse(event);
    const result = await new TranslationController().translate(request);

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error(error);
    if (error instanceof ValidationError) {
      return error.toAPIGatewayProxyResult();
    }
    return {
      statusCode: 500,
      body: 'Unknown error',
    }
  }
}
