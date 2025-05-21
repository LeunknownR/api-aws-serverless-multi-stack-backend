/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError, { AppErrorArguments } from './AppError';

type PartialAppErrorArguments<K extends string> = Record<K, Omit<Omit<AppErrorArguments, 'categoryCode'>, 'reference'>>;
export type AppErrorTableArguments<K extends string> = {
  code: string;
  readonly title: string;
  readonly description: string;
  errors: PartialAppErrorArguments<K>;
};
class AppErrorTable<K extends string> {
  readonly title: string;
  readonly description: string;
  readonly errors: Record<K, AppError>;
  constructor({ code, title, description, errors }: AppErrorTableArguments<K>) {
    this.title = title;
    this.description = description;
    this.errors = this.getErrors(code, errors);
  }
  private getErrors(code: string, partialErrors: PartialAppErrorArguments<K>): Record<K, AppError> {
    const errors: Record<string, AppError> = {};
    for (const key in partialErrors) {
      const partialError = partialErrors[key];
      errors[key] = new AppError({
        orderCode: partialError.orderCode,
        description: partialError.description,
        message: partialError.message,
        categoryCode: code,
        reference: key,
      });
    }
    return errors;
  }
}

export default AppErrorTable;
