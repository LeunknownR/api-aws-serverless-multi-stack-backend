import ApiResponse, { ApiResponseBody } from '@/infrastructure/api/ApiResponse';
import { HttpResponseStatusCode } from '@/infrastructure/HttpResponseStatusCode';
import { MOCK_ERRORS } from '../mocks/mock-app-errors';

describe('ApiResponse', () => {
  it('success response with data', () => {
    const MOCK_RESPONSE_BODY: ApiResponseBody<{ attr: string }, string> = {
      message: 'Error',
      errors: MOCK_ERRORS,
    };
    const response = ApiResponse.Send(HttpResponseStatusCode.Ok, MOCK_RESPONSE_BODY);
    expect(response.statusCode).toBe(HttpResponseStatusCode.Ok);
    expect(response.body).toEqual(JSON.stringify(MOCK_RESPONSE_BODY));
  });
  it('success response without data', () => {
    const MOCK_RESPONSE_BODY: ApiResponseBody<null, string> = {
      message: 'Success',
      data: null,
    };
    const response = ApiResponse.Send(HttpResponseStatusCode.Ok, MOCK_RESPONSE_BODY);
    expect(response.statusCode).toBe(HttpResponseStatusCode.Ok);
    expect(response.body).toEqual(
      JSON.stringify({
        ...MOCK_RESPONSE_BODY,
        errors: [],
      }),
    );
  });
  it('error response', () => {
    const MOCK_RESPONSE_BODY: ApiResponseBody<null, string> = {
      message: 'Error',
      data: null,
      errors: MOCK_ERRORS,
    };
    const response = ApiResponse.Send(HttpResponseStatusCode.BadRequest, MOCK_RESPONSE_BODY);
    expect(response.statusCode).toBe(HttpResponseStatusCode.BadRequest);
    expect(response.body).toEqual(JSON.stringify(MOCK_RESPONSE_BODY));
  });
});
