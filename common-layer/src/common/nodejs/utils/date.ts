/**
 * @description Format: "{year}-{month}-{date}"
 */
export function createDateFromYYYYMMDD(parts: string): Date {
  const [year, month, date] = parts.split('-').map(chunk => parseInt(chunk));
  return new Date(year, month - 1, date);
}

/**
 * @description Format: "{year}-{month}-{date}"
 */
export function formatDateToYYYYMMDD(date: Date): string {
  return date.toISOString().split('T')[0];
}

export const DAY_IN_MILLISECONDS: number = 24 * 60 * 60 * 1000;
