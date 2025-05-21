import MockUserRepository from '../mocks/MockUserRepository';
import { APP_USER_ERRORS } from '/opt/nodejs/domain/app-errors/errors/user-errors';
import UserQueryService from '/opt/users/domain/services/UserQueryService';
import { expectAppErrorAsync, notExpectAppErrorAsync } from '../../../common-layer/tests/test-utils';

describe('UserQueryService', () => {
  let userQueryService: UserQueryService;

  beforeEach(() => {
    userQueryService = new UserQueryService(
      new MockUserRepository([
        {
          id: '1',
          email: 'test@test.com',
          postalCode: '12345',
          fullAddress: '123 Main St',
          phone: '1234567890',
        },
      ]),
    );
  });

  it('should be passed if the user is not duplicated', async () => {
    await notExpectAppErrorAsync(APP_USER_ERRORS.USER_DUPLICATED, async () => {
      await userQueryService.checkDuplicated('2');
    });
  });

  it('should throw an error if the user is duplicated', async () => {
    await expectAppErrorAsync(APP_USER_ERRORS.USER_DUPLICATED, async () => {
      await userQueryService.checkDuplicated('1');
    });
  });

  it('should get a user by id', async () => {
    await notExpectAppErrorAsync(APP_USER_ERRORS.USER_NOT_FOUND, async () => {
      await userQueryService.get('1');
    });
  });

  it('should throw an error if the user is not found', async () => {
    await expectAppErrorAsync(APP_USER_ERRORS.USER_NOT_FOUND, async () => {
      await userQueryService.get('2');
    });
  });
});
