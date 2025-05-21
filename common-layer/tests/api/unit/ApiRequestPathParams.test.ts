import { expectAppError } from '../../test-utils';
import { APP_API_ERRORS } from '@/domain/app-errors/errors/api.errors';
import TestApiEvent from '../../TestApiEvent';
import ApiRequestPathParams from '@/infrastructure/api/ApiRequestPathParams';
import ApiRequestValidationError from '@/infrastructure/api/ApiRequestValidationError';

const requestSampleSchema = {
  type: 'object',
  properties: {
    attr: { type: 'string' },
  },
} as const;
type RequestSampleSchema = typeof requestSampleSchema;
describe('ApiRequestPathParams', () => {
  it('should be instantiated when body is valid JSON', () => {
    const result = ApiRequestPathParams.Payload<RequestSampleSchema>(
      TestApiEvent.WithPathParams({ attr: 'test' }),
      requestSampleSchema,
    );
    expect(result).toEqual({ attr: 'test' });
  });
  it('should throw error when path params are not present', () => {
    expectAppError(APP_API_ERRORS.EMPTY_REQUEST_PATH_PARAMETERS, () => {
      ApiRequestPathParams.Payload<RequestSampleSchema>(TestApiEvent.WithPathParams(), requestSampleSchema);
    });
  });
  it('should throw error when path params are not valid with schema', () => {
    expect(() => {
      ApiRequestPathParams.Payload<RequestSampleSchema>(TestApiEvent.WithPathParams({ attr: 1 }), requestSampleSchema);
    }).toThrow(ApiRequestValidationError);
  });
});
