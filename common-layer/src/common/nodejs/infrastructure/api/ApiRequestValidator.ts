/* eslint-disable @typescript-eslint/no-explicit-any */
import { getKeyPayloadAppError } from '../../domain/app-errors/helpers';
import addFormats from 'ajv-formats';
import addErrors from 'ajv-errors';
import { JSONSchema } from 'json-schema-to-ts';
import APP_ERRORS from '../../domain/app-errors';
import AppErrorSummary from '../../domain/app-errors/AppErrorSummary';
import { Ajv, ErrorObject } from 'ajv';
import { AppErrorParams } from '../../domain/app-errors/AppError';
import { APP_API_ERRORS } from '../../domain/app-errors/errors/api.errors';
import { Singleton } from '../../utils/singleton';

type AppErrorValidationExtension = Readonly<{
  field: string | null;
  type: string;
}>;
export default class ApiRequestValidator {
  private readonly ajv: Ajv;
  constructor() {
    this.ajv = new Ajv({ allErrors: true, strict: false });
    this.ajv.addKeyword('example');
    addFormats(this.ajv);
    addErrors(this.ajv);
  }
  validate(schema: JSONSchema, bodyParsed: any): AppErrorSummary<AppErrorValidationExtension>[] {
    const validate = this.ajv.compile(schema);
    validate(bodyParsed);
    return validate?.errors?.map(error => this.toFieldError(error)) || [];
  }
  private getValidationRequestBodyError(
    field: string | null,
    type: string,
    message?: string,
  ): AppErrorSummary<AppErrorValidationExtension> {
    const error = APP_API_ERRORS.VALIDATION_REQUEST_DATA;
    const { code, reference } = error;
    let params: AppErrorParams | undefined;
    if (message) params = { message };
    return new AppErrorSummary(code, error.getMessage(params), reference, {
      field: this.getSafeField(field),
      type,
    });
  }
  private getSafeField(field: string | null): string {
    return field || '*root*';
  }
  private toFieldError({
    instancePath,
    message,
    params,
    keyword: keywordRoot,
  }: ErrorObject): AppErrorSummary<AppErrorValidationExtension> {
    const field = instancePath || null;
    const type = params?.errors?.[0]?.keyword || keywordRoot || 'generic';
    const key = message && getKeyPayloadAppError(message);
    if (!key) return this.getValidationRequestBodyError(field, type, message);
    const error = APP_ERRORS[key.value];
    return {
      code: error.code,
      message: error.getMessage(key.params),
      reference: error.reference,
      extension: {
        field: this.getSafeField(field),
        type,
      },
    };
  }
}

export const getApiRequestValidator = Singleton(() => new ApiRequestValidator());
