const getUserByIdPathParamsSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      description: 'Id del usuario.',
      minLength: 1,
    },
  },
  required: ['id'],
  additionalProperties: false,
} as const;

export default getUserByIdPathParamsSchema;
