import UserDomainError from '../exceptions/UserDomainError';
import UserRepository from '/opt/nodejs/domain/repositories/UserRepository';
import { APP_USER_ERRORS } from '/opt/nodejs/domain/app-errors/errors/user-errors';
import DomainErrorCode from '/opt/nodejs/domain/exceptions/core/DomainErrorCode';
import User from '/opt/nodejs/domain/entities/User';

export default class UserQueryService {
  constructor(private readonly repository: UserRepository) {}
  async get(id: string): Promise<User> {
    const user = await this.repository.getUserById(id);
    if (!user)
      throw new UserDomainError(DomainErrorCode.NotFound, [
        {
          error: APP_USER_ERRORS.USER_NOT_FOUND,
          params: { id },
        },
      ]);
    return user;
  }
  async check(id: string): Promise<void> {
    const user = await this.repository.getUserById(id);
    if (user)
      throw new UserDomainError(DomainErrorCode.Conflict, [
        {
          error: APP_USER_ERRORS.USER_ID_ALREADY_EXISTS,
          params: { id },
        },
      ]);
  }
}
