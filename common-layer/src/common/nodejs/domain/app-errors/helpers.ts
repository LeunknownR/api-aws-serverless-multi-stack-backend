/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppErrorKey } from '.';
import { AppErrorParams } from './AppError';

export type AppErrorMessagePayload = {
  value: AppErrorKey;
  params?: AppErrorParams;
};

export const KEY_APP_ERROR_CONTROL_CHAR = '#';
//Example: #ERROR_KEY:a=1&b=2
export function buildKeyAppErrorIdentifier({ value: key, params }: AppErrorMessagePayload): string {
  const paramsString = Object.entries(params || {})
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  return `${KEY_APP_ERROR_CONTROL_CHAR}${key}${paramsString ? `:${paramsString}` : ''}`;
}
export function getKeyPayloadAppError(message: string): AppErrorMessagePayload | null {
  const [value, paramsString] = message?.split(KEY_APP_ERROR_CONTROL_CHAR)[1]?.split(':') || [];
  let params: AppErrorParams | undefined;
  if (paramsString) params = Object.fromEntries(paramsString.split('&').map(param => param.split('=')));
  if (value) return { value: value as AppErrorKey, params };
  return null;
}
export function fillMessageTemplate(templateMessage: string, params: Record<string, any>): string {
  let message: string = templateMessage;
  for (const attribute in params) {
    message = message.replace(`{${attribute}}`, params[attribute]);
  }
  return message;
}
