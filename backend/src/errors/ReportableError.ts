import { APIGatewayProxyResult } from 'aws-lambda';

export type ReportableErrorBody = {
  type: string;
  details: unknown;
}

export default abstract class ReportableError extends Error {
  private statusCode: number;
  private body: ReportableErrorBody;

  protected constructor(
    statusCode: number,
    body: ReportableErrorBody,
  ) {
    super();
    this.statusCode = statusCode;
    this.body = body;
  }

  toAPIGatewayProxyResult(): APIGatewayProxyResult {
    return {
      statusCode: this.statusCode,
      body: JSON.stringify(this.body),
    };
  }
}
