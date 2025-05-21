import { FromSchema } from '/opt/nodejs/infrastructure/api/json-schema-to-ts';
import registerUserSchema from './register-user-schema';
import getUserByIdPathParamsSchema from './get-user-by-id-path-params-schema';

export type RegisterUserDTO = FromSchema<typeof registerUserSchema>;
export type GetUserByIdPathParamsDTO = FromSchema<typeof getUserByIdPathParamsSchema>;
