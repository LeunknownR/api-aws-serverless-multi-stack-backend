import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import ApiResponse from './ApiResponse';
import APP_ERRORS from '../../domain/app-errors';
import { getHttpResponseStatusCodeByDomainErrorCode, HttpResponseStatusCode } from '../HttpResponseStatusCode';
import DomainError from '../../domain/exceptions/core/DomainError';
import ApiRequestValidationError from './ApiRequestValidationError';

type EndpointHandler = (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>;
export default function handleApiError(handler: EndpointHandler): EndpointHandler {
  return async event => {
    try {
      return await handler(event);
    } catch (error) {
      console.log('[ERROR LOG]', error);
      if (error instanceof DomainError)
        return ApiResponse.Send(getHttpResponseStatusCodeByDomainErrorCode(error.code), {
          message: error.message,
          errors: error.data,
        });
      if (error instanceof ApiRequestValidationError) return ApiResponse.Send(error.statusCode, error.data);
      return ApiResponse.Send(HttpResponseStatusCode.InternalServerError, {
        message: 'Unexpected error',
        errors: [
          {
            code: APP_ERRORS.UNEXPECTED_ERROR.code,
            message: APP_ERRORS.UNEXPECTED_ERROR.getMessage(),
            reference: APP_ERRORS.UNEXPECTED_ERROR.reference,
          },
        ],
      });
    }
  };
}
