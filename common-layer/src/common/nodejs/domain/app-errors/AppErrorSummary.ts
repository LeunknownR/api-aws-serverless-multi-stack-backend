import AppError from './AppError';

export default class AppErrorSummary<E = undefined> {
  constructor(
    readonly code: string,
    readonly message: string,
    readonly reference: string,
    readonly extension?: E,
  ) {}
  static FromAppError<E>(appError: AppError, extension?: E): AppErrorSummary<E> {
    return new AppErrorSummary(appError.code, appError.getMessage(), appError.reference, extension);
  }
}
