import handleApiError from '/opt/nodejs/infrastructure/api/api-error-handler';
import ApiResponse from '/opt/nodejs/infrastructure/api/ApiResponse';
import { HttpResponseStatusCode } from '/opt/nodejs/infrastructure/HttpResponseStatusCode';
import ApiRequestBody from '/opt/nodejs/infrastructure/api/ApiRequestBody';
import RegisterUserUseCase from '../layer/users/application/usecases/RegisterUserUseCase';
import registerUserSchema from '/opt/users/infrastructure/api/api-request-schemas/register-user-schema';
import { RegisterUserDTO } from '/opt/users/infrastructure/api/api-request-schemas/types';
import { IMPLEMENTATION_FACTORY } from '/opt/nodejs/infrastructure/ImplementationFactory';

export const handler = handleApiError(async event => {
  const registerUserDTO = ApiRequestBody.Payload<RegisterUserDTO>(event, registerUserSchema);
  const registerUserUseCase = new RegisterUserUseCase(
    IMPLEMENTATION_FACTORY.getUserRepository(),
    IMPLEMENTATION_FACTORY.getProcessTracker(),
  );
  const user = await registerUserUseCase.run({ dto: registerUserDTO });
  return ApiResponse.Send(HttpResponseStatusCode.Created, {
    message: 'Successfully registered user',
    data: user,
  });
});
