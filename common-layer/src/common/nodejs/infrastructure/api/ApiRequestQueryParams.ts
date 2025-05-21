/* eslint-disable @typescript-eslint/no-explicit-any */
import { APIGatewayProxyEvent, APIGatewayProxyEventQueryStringParameters } from 'aws-lambda';
import { JSONSchema } from 'json-schema-to-ts';
import ApiRequestValidationError, { ApiResponseErrorStatusCode } from './ApiRequestValidationError';
import { getApiRequestValidator } from './ApiRequestValidator';
import { APP_API_ERRORS } from '../../domain/app-errors/errors/api.errors';

export default class ApiRequestQueryParams<R> {
  readonly raw: R;
  constructor(
    event: APIGatewayProxyEvent,
    private readonly schema: JSONSchema,
  ) {
    const queryParams = event?.queryStringParameters;
    if (!queryParams)
      throw ApiRequestValidationError.FromAppErrors(ApiResponseErrorStatusCode.BadRequest, [
        APP_API_ERRORS.EMPTY_REQUEST_QUERY_PARAMETERS,
      ]);
    this.raw = this.parse(queryParams);
  }
  static Payload<R>(event: APIGatewayProxyEvent, schema: JSONSchema): R {
    return new ApiRequestQueryParams<R>(event, schema).raw;
  }
  private parse(queryParams: APIGatewayProxyEventQueryStringParameters): R {
    const apiRequestValidator = getApiRequestValidator();
    const errors = apiRequestValidator.validate(this.schema, queryParams);
    if (errors.length > 0) throw new ApiRequestValidationError(ApiResponseErrorStatusCode.BadRequest, errors);
    return queryParams as R;
  }
}
