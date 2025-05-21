import AppError, { AppErrorParams } from '../../app-errors/AppError';
import AppErrorSummary from '../../app-errors/AppErrorSummary';
import CustomError from '../CustomError';
import DomainErrorCode from './DomainErrorCode';

export type DomainErrorBuilder<E = undefined> = {
  error: AppError;
  params?: AppErrorParams;
  extension?: E;
};
export type DomainErrorBuilderNullable<E = undefined> = DomainErrorBuilder<E> | null;
export default abstract class DomainError<E = undefined> extends CustomError<AppErrorSummary<E>[]> {
  constructor(
    message: string,
    readonly code: DomainErrorCode,
    builders: DomainErrorBuilder<E>[],
  ) {
    super(
      message,
      builders.map(({ error, params, extension }) => ({
        code: error.code,
        message: error.getMessage(params),
        reference: error.reference,
        extension,
      })),
    );
  }
}
