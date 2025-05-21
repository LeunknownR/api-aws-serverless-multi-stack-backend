import AppErrorSummary from '@/domain/app-errors/AppErrorSummary';

export const MOCK_ERRORS: AppErrorSummary<string>[] = [
  {
    code: 'TEST_ERROR',
    message: 'Test error message',
    reference: 'test-reference',
  },
];
