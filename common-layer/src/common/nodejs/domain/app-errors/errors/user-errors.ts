import AppErrorTable from '../AppErrorTable';

const APP_USER_ERROR_TABLE = new AppErrorTable({
  code: 'USR',
  title: 'Errores sobre Usuarios / Users',
  description: 'Listado de errores relacionados con los usuarios.',
  errors: {
    USER_ID_ALREADY_EXISTS: {
      orderCode: 1,
      message: `The user with id {id} already exists`,
      description: 'El id de la usuario ya fue registrado previamente.',
    },
    USER_CREATION_FAILED: {
      orderCode: 2,
      message: `The user creation has failed`,
      description: 'El usuario no pudo ser creado por algún error inesperado.',
    },
    USER_NOT_FOUND: {
      orderCode: 3,
      message: `The user with id {id} not found`,
      description: 'El id de la usuario no fue encontrado.',
    },
  },
});

export const APP_USER_ERRORS = APP_USER_ERROR_TABLE.errors;

export default APP_USER_ERROR_TABLE;
