import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export default async function translateApi(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  return {
    statusCode: 200,
    body: "Hello AWS",
  };
}
