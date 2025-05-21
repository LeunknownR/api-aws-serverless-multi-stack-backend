import ApiRequestBody from '@/infrastructure/api/ApiRequestBody';
import { expectAppError } from '../../test-utils';
import { APP_API_ERRORS } from '@/domain/app-errors/errors/api.errors';
import TestApiEvent from '../../TestApiEvent';
import ApiRequestValidationError from '@/infrastructure/api/ApiRequestValidationError';

const requestSampleSchema = {
  type: 'object',
  properties: {
    attr: { type: 'string' },
  },
} as const;
type RequestSampleSchema = typeof requestSampleSchema;
describe('ApiRequestBody', () => {
  it('should be instantiated when body is valid JSON', () => {
    const result = ApiRequestBody.Payload<RequestSampleSchema>(
      TestApiEvent.WithBody({ attr: 'test' }),
      requestSampleSchema,
    );
    expect(result).toEqual({ attr: 'test' });
  });
  it('should throw error when body is not present', () => {
    expectAppError(APP_API_ERRORS.EMPTY_REQUEST_BODY, () => {
      ApiRequestBody.Payload<RequestSampleSchema>(TestApiEvent.WithBody(), requestSampleSchema);
    });
  });
  it('should throw error when body is invalid JSON', () => {
    expectAppError(APP_API_ERRORS.REQUEST_BODY_PARSING, () => {
      ApiRequestBody.Payload<RequestSampleSchema>(TestApiEvent.WithBody('{'), requestSampleSchema);
    });
  });
  it('should throw error when body is not valid with schema', () => {
    expect(() => {
      ApiRequestBody.Payload<RequestSampleSchema>(TestApiEvent.WithBody({ attr: 1 }), requestSampleSchema);
    }).toThrow(ApiRequestValidationError);
  });
});
