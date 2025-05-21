import ApiRequestValidationError, { ApiResponseErrorStatusCode } from '@/infrastructure/api/ApiRequestValidationError';
import { MOCK_ERRORS } from '../mocks/mock-app-errors';

describe('ApiRequestValidationError', () => {
  it('should create an instance', () => {
    const error = new ApiRequestValidationError(ApiResponseErrorStatusCode.BadRequest, MOCK_ERRORS);
    expect(error.message).toBe('Validation request');
    expect(error.statusCode).toBe(ApiResponseErrorStatusCode.BadRequest);
    expect(error.data).toEqual({
      message: 'Validation request',
      errors: MOCK_ERRORS,
    });
  });
});
