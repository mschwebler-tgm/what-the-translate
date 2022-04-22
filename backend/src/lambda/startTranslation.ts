import 'reflect-metadata';
import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';
import TranslationRequestFactory from '@controller/request/TranslationRequestFactory';
import TranslationController from '@controller/TranslationController';
import ReportableError from '@errors/ReportableError';
import iocContainer from '@ioc/iocContainer';

export default async function startTranslation(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  try {
    const requestFactory = new TranslationRequestFactory();
    const request = requestFactory.parse(event);
    const result = await iocContainer.get(TranslationController).translate(request);

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error(error);
    if (error instanceof ReportableError) {
      return error.toAPIGatewayProxyResult();
    }
    return {
      statusCode: 500,
      body: JSON.stringify({messsage: 'Unknown error'}),
    };
  }
}
