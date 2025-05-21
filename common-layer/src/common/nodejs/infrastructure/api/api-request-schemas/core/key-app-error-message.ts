import { AppErrorMessagePayload, buildKeyAppErrorIdentifier } from '../../../../domain/app-errors/helpers';

export type AppErrorMessages = Record<string, AppErrorMessagePayload>;
export default function getKeyAppErrorMessage(messages: AppErrorMessages) {
  const entries = Object.entries(messages).map(([key, payload]) => [key, buildKeyAppErrorIdentifier(payload)]);
  return Object.fromEntries(entries);
}
