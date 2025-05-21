import { APIGatewayProxyEvent } from 'aws-lambda';
import { JSONSchema } from 'json-schema-to-ts';
import ApiRequestValidationError, { ApiResponseErrorStatusCode } from './ApiRequestValidationError';
import { getApiRequestValidator } from './ApiRequestValidator';
import { APP_API_ERRORS } from '../../domain/app-errors/errors/api.errors';

export default class ApiRequestBody<R> {
  readonly raw: R;
  private constructor(
    event: APIGatewayProxyEvent,
    private readonly schema: JSONSchema,
  ) {
    const body = event?.body;
    if (!body)
      throw ApiRequestValidationError.FromAppErrors(ApiResponseErrorStatusCode.BadRequest, [
        APP_API_ERRORS.EMPTY_REQUEST_BODY,
      ]);
    this.raw = this.parse(body);
  }
  private parse(body: string): R {
    let bodyParsed: unknown;
    try {
      bodyParsed = JSON.parse(body);
    } catch {
      throw ApiRequestValidationError.FromAppErrors(ApiResponseErrorStatusCode.BadRequest, [
        APP_API_ERRORS.REQUEST_BODY_PARSING,
      ]);
    }
    const apiRequestValidator = getApiRequestValidator();
    const errors = apiRequestValidator.validate(this.schema, bodyParsed);
    if (errors.length > 0) throw new ApiRequestValidationError(ApiResponseErrorStatusCode.BadRequest, errors);
    return bodyParsed as R;
  }
  static Payload<R>(event: APIGatewayProxyEvent, schema: JSONSchema): R {
    return new ApiRequestBody<R>(event, schema).raw;
  }
}
