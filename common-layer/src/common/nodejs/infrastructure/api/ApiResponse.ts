import { APIGatewayProxyResult } from 'aws-lambda';
import { HttpResponseStatusCode } from '../HttpResponseStatusCode';
import AppErrorSummary from '../../domain/app-errors/AppErrorSummary';

export type ApiResponseBody<D, E> = {
  message: string;
  errors?: AppErrorSummary<E>[];
  data?: D;
};
export default class ApiResponse<D, E> {
  private constructor(
    private readonly statusCode: HttpResponseStatusCode,
    private readonly body: ApiResponseBody<D, E>,
  ) {}
  private build(): APIGatewayProxyResult {
    return this.response(this.body);
  }
  private getHeaders(extraHeaders?: unknown): Record<string, string> {
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE',
      'Access-Control-Allow-Origin': '*',
    };
    if (extraHeaders) Object.assign(headers, extraHeaders);
    return headers;
  }
  private response<D>(body: ApiResponseBody<D, E>, extraHeaders?: unknown): APIGatewayProxyResult {
    return {
      statusCode: this.statusCode,
      body: JSON.stringify({
        message: body.message,
        data: body.data,
        errors: body.errors || [],
      }),
      headers: this.getHeaders(extraHeaders),
    };
  }
  static Send<D, E>(statusCode: HttpResponseStatusCode, body: ApiResponseBody<D, E>): APIGatewayProxyResult {
    return new ApiResponse(statusCode, body).build();
  }
}
