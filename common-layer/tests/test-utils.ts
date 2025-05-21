import AppError from '../src/common/nodejs/domain/app-errors/AppError';
import ApiRequestValidationError from '../src/common/nodejs/infrastructure/api/ApiRequestValidationError';
import ApiRequestBody from '../src/common/nodejs/infrastructure/api/ApiRequestBody';
import { JSONSchema } from '../src/common/nodejs/infrastructure/api/json-schema-to-ts';
import DomainError from '../src/common/nodejs/domain/exceptions/core/DomainError';
import AppErrorSummary from '../src/common/nodejs/domain/app-errors/AppErrorSummary';
import TestApiEvent from './TestApiEvent';

//#region AppError
function hasAppError(appError: AppError, err: unknown): boolean {
  let errors: AppErrorSummary[] = [];
  if (err instanceof ApiRequestValidationError) errors = err.data.errors!;
  if (err instanceof DomainError) errors = err.data;
  return errors.map(e => e.code).includes(appError.code);
}
function tryActionForAppError(error: AppError, action: () => void): boolean {
  try {
    action();
    return false;
  } catch (err) {
    return hasAppError(error, err);
  }
}
export function expectAppError(error: AppError, action: () => void) {
  expect(tryActionForAppError(error, action)).toBe(true);
}
export function notExpectAppError(error: AppError, action: () => void) {
  expect(tryActionForAppError(error, action)).toBe(false);
}
async function tryActionForAppErrorAsync(error: AppError, action: () => Promise<void>): Promise<boolean> {
  try {
    await action();
    return false;
  } catch (err) {
    return hasAppError(error, err);
  }
}
export async function expectAppErrorAsync(error: AppError, action: () => Promise<void>) {
  expect(await tryActionForAppErrorAsync(error, action)).toBe(true);
}
export async function notExpectAppErrorAsync(error: AppError, action: () => Promise<void>) {
  expect(await tryActionForAppErrorAsync(error, action)).toBe(false);
}
//#endregion
export function createRequestBodyClosure(schema: JSONSchema) {
  return function <RS>(sample: RS) {
    return ApiRequestBody.Payload<RS>(TestApiEvent.WithBody(sample), Object.freeze(schema));
  };
}
