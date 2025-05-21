/* eslint-disable @typescript-eslint/no-explicit-any */
import { APIGatewayProxyEvent, APIGatewayProxyEventPathParameters } from 'aws-lambda';
import { JSONSchema } from 'json-schema-to-ts';
import ApiRequestValidationError, { ApiResponseErrorStatusCode } from './ApiRequestValidationError';
import { getApiRequestValidator } from './ApiRequestValidator';
import { APP_API_ERRORS } from '../../domain/app-errors/errors/api.errors';

export default class ApiRequestPathParams<R> {
  readonly raw: R;
  private constructor(
    event: APIGatewayProxyEvent,
    private readonly schema: JSONSchema,
  ) {
    const pathParameters = event?.pathParameters;
    if (!pathParameters)
      throw ApiRequestValidationError.FromAppErrors(ApiResponseErrorStatusCode.BadRequest, [
        APP_API_ERRORS.EMPTY_REQUEST_PATH_PARAMETERS,
      ]);
    this.raw = this.parse(pathParameters);
  }
  static Payload<R>(event: APIGatewayProxyEvent, schema: JSONSchema): R {
    return new ApiRequestPathParams<R>(event, schema).raw;
  }
  private parse(pathParameters: APIGatewayProxyEventPathParameters): R {
    const apiRequestValidator = getApiRequestValidator();
    const errors = apiRequestValidator.validate(this.schema, pathParameters);
    if (errors.length > 0) throw new ApiRequestValidationError(ApiResponseErrorStatusCode.BadRequest, errors);
    return pathParameters as R;
  }
}
