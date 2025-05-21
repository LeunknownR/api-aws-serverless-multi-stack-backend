import UserQueryService from '../../domain/services/UserQueryService';
import { RegisterUserDTO } from '../../infrastructure/api/api-request-schemas/types';
import ProcessTracker from '/opt/nodejs/domain/logs/ProcessTracker';
import UserRepository from '/opt/nodejs/domain/repositories/UserRepository';
import User from '/opt/nodejs/domain/entities/User';
import DomainErrorCode from '/opt/nodejs/domain/exceptions/core/DomainErrorCode';
import UserDomainError from '../../domain/exceptions/UserDomainError';
import { APP_USER_ERRORS } from '/opt/nodejs/domain/app-errors/errors/user-errors';

type RegisterUserUseCaseCommand = {
  dto: RegisterUserDTO;
};
export default class RegisterUserUseCase {
  private readonly existsUserByIdService: UserQueryService;
  constructor(
    private readonly userRepository: UserRepository,
    private readonly processTracker: ProcessTracker,
  ) {
    this.existsUserByIdService = new UserQueryService(userRepository);
  }
  async run({ dto }: RegisterUserUseCaseCommand): Promise<User> {
    const user: User = {
      id: dto.id,
      email: dto.email,
      postalCode: dto.postalCode,
      fullAddress: dto.fullAddress,
      phone: dto.phone,
    };
    await this.existsUserByIdService.checkDuplicated(user.id);
    const success = await this.userRepository.registerUser(user);
    if (!success)
      throw new UserDomainError(DomainErrorCode.Fatal, [
        {
          error: APP_USER_ERRORS.USER_CREATION_FAILED,
        },
      ]);
    this.processTracker.track({
      title: 'User registered',
      data: {
        userId: user.id,
      },
    });
    return user;
  }
}
