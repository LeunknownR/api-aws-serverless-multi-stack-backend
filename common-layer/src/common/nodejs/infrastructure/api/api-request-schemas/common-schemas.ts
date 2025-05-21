import getKeyAppErrorMessage from './core/key-app-error-message';

export function getEmailSchema(description: string) {
  return {
    type: 'string',
    format: 'email',
    description,
    example: 'example@gmail.com',
    minLength: 1,
  } as const;
}
export function getPhoneSchema(description: string) {
  return {
    type: 'string',
    description,
    pattern: '^\\+[1-9]{1,2}\\d{1,14}$',
    example: '+34666666666',
    errorMessage: getKeyAppErrorMessage({
      pattern: {
        value: 'INVALID_PHONE_NUMBER',
      },
    }),
  } as const;
}
export function getFullAddressSchema(description: string) {
  return {
    type: 'string',
    description,
    example: 'Calle Principal 123, Ciudad, País',
    minLength: 1,
  } as const;
}
export function getPostalCodeSchema(description: string) {
  return {
    type: 'string',
    description,
    pattern: '^\\d{5}$',
    example: '12345',
    errorMessage: getKeyAppErrorMessage({
      pattern: {
        value: 'INVALID_POSTAL_CODE',
      },
    }),
  } as const;
}
