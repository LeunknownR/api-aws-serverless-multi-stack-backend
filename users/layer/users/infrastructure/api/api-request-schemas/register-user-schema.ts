import {
  getEmailSchema,
  getFullAddressSchema,
  getPhoneSchema,
  getPostalCodeSchema,
} from '/opt/nodejs/infrastructure/api/api-request-schemas/common-schemas';

const registerUserSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      description: 'Id del usuario.',
      minLength: 1,
    },
    email: getEmailSchema('Correo electrónico del usuario.'),
    postalCode: getPostalCodeSchema('Código postal del usuario.'),
    fullAddress: getFullAddressSchema('Dirección del usuario.'),
    phone: getPhoneSchema('Teléfono del usuario.'),
  },
  required: ['id', 'email', 'postalCode', 'fullAddress', 'phone'],
  additionalProperties: false,
} as const;

export default registerUserSchema;
