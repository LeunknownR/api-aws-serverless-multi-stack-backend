import { AppErrorTableArguments } from '@/domain/app-errors/AppErrorTable';

export const APP_ERROR_TABLE_ARGUMENTS_SAMPLE: AppErrorTableArguments<'TEST_ERROR' | 'ANOTHER_ERROR'> = {
  code: 'TST',
  title: 'Test Errors',
  description: 'Test error descriptions',
  errors: {
    TEST_ERROR: {
      orderCode: 1,
      message: 'Test error message',
      description: 'Test error description',
    },
    ANOTHER_ERROR: {
      orderCode: 2,
      message: 'Another test message with {param}',
      description: 'Another test description',
    },
  },
};
