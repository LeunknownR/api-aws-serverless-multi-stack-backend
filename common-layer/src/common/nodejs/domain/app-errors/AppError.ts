export type AppErrorParams = Record<string, string | number | boolean>;
export type AppErrorArguments = Readonly<{
  orderCode: number;
  message: string;
  description: string;
  categoryCode: string;
  reference: string;
}>;
export default class AppError {
  private static readonly ERROR_CODE_TEMPLATE: string = 'AEP_{category}_{order}';
  readonly orderCode: number;
  readonly code: string;
  private readonly message: string;
  readonly description: string;
  readonly reference: string;
  constructor({ orderCode, message, description, categoryCode, reference }: AppErrorArguments) {
    this.orderCode = orderCode;
    this.code = this.getErrorCode(orderCode, categoryCode);
    this.message = message;
    this.description = description;
    this.reference = reference;
  }
  private getErrorCode(order: number, category: string): string {
    return AppError.ERROR_CODE_TEMPLATE.replace('{order}', order.toString().padStart(4, '0')).replace(
      '{category}',
      category,
    );
  }
  getMessage(params?: AppErrorParams): string {
    let message: string = this.message;
    if (!params) return message;
    for (const attribute in params) {
      const value = params[attribute];
      if (value) message = message.replace(`{${attribute}}`, String(value));
    }
    return message;
  }
}
