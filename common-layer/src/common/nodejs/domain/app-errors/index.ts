import { APP_GENERIC_ERRORS } from './errors/generic.errors';
import { APP_USER_ERRORS } from './errors/user-errors';
import { APP_AUTH_ERRORS } from './errors/auth.errors';
import { APP_API_ERRORS } from './errors/api.errors';

const APP_ERRORS = {
  ...APP_GENERIC_ERRORS,
  ...APP_API_ERRORS,
  ...APP_AUTH_ERRORS,
  ...APP_USER_ERRORS,
};

export type AppErrorKey = keyof typeof APP_ERRORS;

export default APP_ERRORS;
