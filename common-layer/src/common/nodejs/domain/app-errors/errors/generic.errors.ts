import AppErrorTable from '../AppErrorTable';

const APP_GENERIC_ERROR_TABLE = new AppErrorTable({
  code: 'GNR',
  title: 'Errores genéricos',
  description: 'Listado de errores genéricos.',
  errors: {
    UNEXPECTED_ERROR: {
      orderCode: 1,
      message: 'An unexpected error has ocurred',
      description: 'Ocurrió un error inesperado.',
    },
    INVALID_ULID: {
      orderCode: 2,
      message: 'must be ULID (26 alphanumeric characters).',
      description: 'El valor no cumple con el formato ULID (26 alfanuméricos).',
    },
    INVALID_COUNTRY_CODE: {
      orderCode: 3,
      message: 'must be a valid country code (2 letters in uppercase like ES, PT, FR, etc).',
      description:
        'El código de país no es válido, debe ser un código de país de 2 letras en mayúsculas (ES, PT, FR, etc).',
    },
    INVALID_POSTAL_CODE: {
      orderCode: 4,
      message: 'must be a valid postal code (5 digits).',
      description: 'El código postal no es válido, debe ser un código postal de 5 dígitos.',
    },
    INVALID_PHONE_NUMBER: {
      orderCode: 5,
      message: 'must be a valid phone number (country code + 14 digits).',
      description: 'El número de teléfono no es válido, debe ser un número de teléfono de 10-15 dígitos.',
    },
  },
});

export const APP_GENERIC_ERRORS = APP_GENERIC_ERROR_TABLE.errors;

export default APP_GENERIC_ERROR_TABLE;
