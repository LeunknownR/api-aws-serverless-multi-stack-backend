import AppErrorTable from '../AppErrorTable';

const APP_AUTH_ERROR_TABLE = new AppErrorTable({
  code: 'ATH',
  title: 'Errores de autenticación',
  description: 'Listado de errores relacionados con la autenticación.',
  errors: {
    USER_IS_NOT_PRESENT_IN_REQUEST: {
      orderCode: 1,
      message: 'The user is not present in the request.',
      description: 'El usuario no está presente en la request.',
    },
  },
});

export const APP_AUTH_ERRORS = APP_AUTH_ERROR_TABLE.errors;

export default APP_AUTH_ERROR_TABLE;
