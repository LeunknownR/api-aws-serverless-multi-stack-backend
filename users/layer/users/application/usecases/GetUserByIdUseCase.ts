import UserQueryService from '../../domain/services/UserQueryService';
import ProcessTracker from '/opt/nodejs/domain/logs/ProcessTracker';
import UserRepository from '/opt/nodejs/domain/repositories/UserRepository';
import User from '/opt/nodejs/domain/entities/User';

type GetUserByIdUseCaseCommand = {
  userId: string;
};
export default class GetUserByIdUseCase {
  private readonly userQueryService: UserQueryService;
  constructor(
    userRepository: UserRepository,
    private readonly processTracker: ProcessTracker,
  ) {
    this.userQueryService = new UserQueryService(userRepository);
  }
  async run({ userId }: GetUserByIdUseCaseCommand): Promise<User> {
    this.processTracker.track({
      title: 'Search user...',
      data: {
        userId,
      },
    });
    const user = await this.userQueryService.get(userId);
    this.processTracker.track({
      title: 'User found',
      data: {
        userId,
      },
    });
    return user;
  }
}
