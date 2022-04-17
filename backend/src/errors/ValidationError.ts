import ReportableError from './ReportableError';
import { APIGatewayProxyResult } from 'aws-lambda';

export default class ValidationError extends ReportableError {
  constructor(message: string) {
    super(
      400,
      {
        type: 'validationError',
        details: message,
      }
    );
  }
}
