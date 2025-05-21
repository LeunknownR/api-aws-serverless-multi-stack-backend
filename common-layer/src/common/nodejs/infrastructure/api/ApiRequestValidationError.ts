import AppError from '../../domain/app-errors/AppError';
import AppErrorSummary from '../../domain/app-errors/AppErrorSummary';
import CustomError from '../../domain/exceptions/CustomError';
import { HttpResponseStatusCode } from '../HttpResponseStatusCode';
import { ApiResponseBody } from './ApiResponse';

export enum ApiResponseErrorStatusCode {
  InternalServerError = HttpResponseStatusCode.InternalServerError,
  BadRequest = HttpResponseStatusCode.BadRequest,
}
export default class ApiRequestValidationError<D, E> extends CustomError<ApiResponseBody<D, E>> {
  private static readonly MESSAGE: string = 'Validation request';
  readonly statusCode: HttpResponseStatusCode;
  constructor(statusCode: ApiResponseErrorStatusCode, errors: AppErrorSummary<E>[]) {
    super(ApiRequestValidationError.MESSAGE, {
      message: ApiRequestValidationError.MESSAGE,
      errors,
    });
    this.statusCode = Number(statusCode) as HttpResponseStatusCode;
  }
  static FromAppErrors<D, E>(
    statusCode: ApiResponseErrorStatusCode,
    errors: AppError[],
  ): ApiRequestValidationError<D, E> {
    return new ApiRequestValidationError(
      statusCode,
      errors.map(error => AppErrorSummary.FromAppError(error)),
    );
  }
}
