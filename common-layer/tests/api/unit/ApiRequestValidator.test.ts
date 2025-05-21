import ApiRequestValidator from '@/infrastructure/api/ApiRequestValidator';
import { APP_API_ERRORS } from '@/domain/app-errors/errors/api.errors';

const SCHEMA = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 3 },
    age: { type: 'number', minimum: 18 },
    email: { type: 'string', format: 'email' },
  },
  required: ['name', 'age', 'email'],
} as const;
describe('ApiRequestValidator', () => {
  const validator = new ApiRequestValidator();

  it('should return empty array when validation passes', () => {
    const errors = validator.validate(SCHEMA, {
      name: 'John',
      age: 25,
      email: 'john@example.com',
    });
    expect(errors).toEqual([]);
  });

  it('should return validation errors when data is invalid', () => {
    const errors = validator.validate(SCHEMA, {
      name: 'Jo',
      age: '25',
      email: 'invalid-email',
    });
    expect(errors).toHaveLength(3);
    expect(errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: APP_API_ERRORS.VALIDATION_REQUEST_DATA.code,
          extension: {
            field: '/name',
            type: 'minLength',
          },
        }),
        expect.objectContaining({
          code: APP_API_ERRORS.VALIDATION_REQUEST_DATA.code,
          extension: {
            field: '/age',
            type: 'type',
          },
        }),
        expect.objectContaining({
          code: APP_API_ERRORS.VALIDATION_REQUEST_DATA.code,
          extension: {
            field: '/email',
            type: 'format',
          },
        }),
      ]),
    );
  });
});
