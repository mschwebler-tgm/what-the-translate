import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import ValidationError from '../errors/ValidationError';
import { plainToInstance } from 'class-transformer';
import TranslationRequest from '../controller/requests/TranslationRequest';
import TranslationController from '../controller/TranslationController';

export default async function translateApi(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  if (!event.body) {
    return new ValidationError('Request body missing').toAPIGatewayProxyResult();
  }
  const body = JSON.parse(event.body);
  if (Array.isArray(body)) {
    return new ValidationError('Request body must be of type object').toAPIGatewayProxyResult();
  }
  const request = plainToInstance(TranslationRequest, body) as TranslationRequest;
  const result = new TranslationController().translate(request);

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
}
