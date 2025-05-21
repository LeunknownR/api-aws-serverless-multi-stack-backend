import DomainErrorCode from '../domain/exceptions/core/DomainErrorCode';

export enum HttpResponseStatusCode {
  Ok = 200,
  Created = 201,
  Accepted = 202,
  NoContent = 204,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  Conflict = 409,
  InternalServerError = 500,
}

const STATUS_CODE_BY_DOMAIN_ERROR_CODE: Map<DomainErrorCode, HttpResponseStatusCode> = new Map([
  [DomainErrorCode.Conflict, HttpResponseStatusCode.Conflict],
  [DomainErrorCode.Validation, HttpResponseStatusCode.BadRequest],
  [DomainErrorCode.NotFound, HttpResponseStatusCode.NotFound],
  [DomainErrorCode.Fatal, HttpResponseStatusCode.InternalServerError],
]);
export function getHttpResponseStatusCodeByDomainErrorCode(errorCode: DomainErrorCode): HttpResponseStatusCode {
  return STATUS_CODE_BY_DOMAIN_ERROR_CODE.get(errorCode) || HttpResponseStatusCode.BadRequest;
}
