import AppErrorTable from '../AppErrorTable';

const APP_API_ERROR_TABLE = new AppErrorTable({
  code: 'API',
  title: 'Errores sobre la API',
  description: 'Listado de errores relacionados con la API.',
  errors: {
    EMPTY_REQUEST_BODY: {
      orderCode: 1,
      message: 'The request body is empty',
      description: 'El request body no fue enviado.',
    },
    REQUEST_BODY_PARSING: {
      orderCode: 2,
      message: 'The request body parsing failed',
      description: 'El request body falló al convertirse a JSON.',
    },
    VALIDATION_REQUEST_DATA: {
      orderCode: 3,
      message: 'Generic error: {message}',
      description: 'Ocurrió un error de validación de formato genérico.',
    },
    EMPTY_REQUEST_PATH_PARAMETERS: {
      orderCode: 4,
      message: 'The request path parameters is empty',
      description: 'Los request path parameters no fueron enviados.',
    },
    EMPTY_REQUEST_QUERY_PARAMETERS: {
      orderCode: 5,
      message: 'The request query parameters is empty',
      description: 'Los request query parameters no fueron enviados.',
    },
    NOT_SUPPLIED_ANY_FIELD_TO_PATCH: {
      orderCode: 6,
      message: 'No se proporcionó ningún campo para actualizar',
      description: 'No se proporcionó ningún campo para actualizar',
    },
  },
});

export const APP_API_ERRORS = APP_API_ERROR_TABLE.errors;

export default APP_API_ERROR_TABLE;
