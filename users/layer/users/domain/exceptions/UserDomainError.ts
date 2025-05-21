import DomainError, { DomainErrorBuilder } from '/opt/nodejs/domain/exceptions/core/DomainError';
import DomainErrorCode from '/opt/nodejs/domain/exceptions/core/DomainErrorCode';

export default class UserDomainError<E = undefined> extends DomainError<E> {
  constructor(code: DomainErrorCode, builders: DomainErrorBuilder<E>[]) {
    super('User domain error', code, builders);
  }
}
