import { expectAppError } from '../../test-utils';
import { APP_API_ERRORS } from '@/domain/app-errors/errors/api.errors';
import TestApiEvent from '../../TestApiEvent';
import ApiRequestQueryParams from '@/infrastructure/api/ApiRequestQueryParams';
import ApiRequestValidationError from '@/infrastructure/api/ApiRequestValidationError';

const requestSampleSchema = {
  type: 'object',
  properties: {
    attr: { type: 'string' },
  },
} as const;
type RequestSampleSchema = typeof requestSampleSchema;
describe('ApiRequestQueryParams', () => {
  it('should be instantiated when query params are valid', () => {
    const result = ApiRequestQueryParams.Payload<RequestSampleSchema>(
      TestApiEvent.WithQueryParams({ attr: 'test' }),
      requestSampleSchema,
    );
    expect(result).toEqual({ attr: 'test' });
  });
  it('should throw error when query params are not present', () => {
    expectAppError(APP_API_ERRORS.EMPTY_REQUEST_QUERY_PARAMETERS, () => {
      ApiRequestQueryParams.Payload<RequestSampleSchema>(TestApiEvent.WithQueryParams(), requestSampleSchema);
    });
  });
  it('should throw error when query params are not valid with schema', () => {
    expect(() => {
      ApiRequestQueryParams.Payload<RequestSampleSchema>(
        TestApiEvent.WithQueryParams({ attr: 1 }),
        requestSampleSchema,
      );
    }).toThrow(ApiRequestValidationError);
  });
});
