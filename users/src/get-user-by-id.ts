import handleApiError from '/opt/nodejs/infrastructure/api/api-error-handler';
import ApiResponse from '/opt/nodejs/infrastructure/api/ApiResponse';
import { HttpResponseStatusCode } from '/opt/nodejs/infrastructure/HttpResponseStatusCode';
import ApiRequestPathParams from '/opt/nodejs/infrastructure/api/ApiRequestPathParams';
import { IMPLEMENTATION_FACTORY } from '/opt/nodejs/infrastructure/ImplementationFactory';
import getUserByIdPathParamsSchema from '/opt/users/infrastructure/api/api-request-schemas/get-user-by-id-path-params-schema';
import GetUserByIdUseCase from '/opt/users/application/usecases/GetUserByIdUseCase';
import { GetUserByIdPathParamsDTO } from '/opt/users/infrastructure/api/api-request-schemas/types';

export const handler = handleApiError(async event => {
  const { id } = ApiRequestPathParams.Payload<GetUserByIdPathParamsDTO>(event, getUserByIdPathParamsSchema);
  const getUserByIdUseCase = new GetUserByIdUseCase(
    IMPLEMENTATION_FACTORY.getUserRepository(),
    IMPLEMENTATION_FACTORY.getProcessTracker(),
  );
  const user = await getUserByIdUseCase.run({ userId: id });
  return ApiResponse.Send(HttpResponseStatusCode.Ok, {
    message: 'Successfully retrieved user',
    data: user,
  });
});
