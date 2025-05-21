import { APIGatewayProxyEvent } from 'aws-lambda';

export default class TestApiEvent {
  static WithBody(body?: unknown): APIGatewayProxyEvent {
    if (!body) return {} as APIGatewayProxyEvent;
    return {
      body: typeof body === 'string' ? body : JSON.stringify(body),
    } as APIGatewayProxyEvent;
  }
  static WithPathParams(pathParameters?: unknown): APIGatewayProxyEvent {
    return {
      pathParameters,
    } as APIGatewayProxyEvent;
  }
  static WithQueryParams(queryParameters?: Record<string, unknown>): APIGatewayProxyEvent {
    return {
      queryStringParameters: queryParameters,
    } as APIGatewayProxyEvent;
  }
  static WithAuthorizer(user?: { id: string; email: string }): APIGatewayProxyEvent {
    return {
      requestContext: {
        authorizer: { lambda: { user } },
      },
    } as unknown as APIGatewayProxyEvent;
  }
}
