import AppErrorTable from '@/domain/app-errors/AppErrorTable';
import { APP_ERROR_TABLE_ARGUMENTS_SAMPLE } from '../samples/error-table-argument-samples';

describe('AppErrorTable', () => {
  let appErrorTable: AppErrorTable<keyof typeof APP_ERROR_TABLE_ARGUMENTS_SAMPLE.errors>;

  beforeAll(() => {
    appErrorTable = new AppErrorTable(APP_ERROR_TABLE_ARGUMENTS_SAMPLE);
  });

  it('should create an AppErrorTable instance with correct properties', () => {
    expect(appErrorTable.title).toBe(APP_ERROR_TABLE_ARGUMENTS_SAMPLE.title);
    expect(appErrorTable.description).toBe(APP_ERROR_TABLE_ARGUMENTS_SAMPLE.description);
    expect(appErrorTable.errors).toBeDefined();
  });

  it('should generate correct error codes for each error', () => {
    expect(appErrorTable.errors.TEST_ERROR.code).toBe('AEP_TST_0001');
    expect(appErrorTable.errors.ANOTHER_ERROR.code).toBe('AEP_TST_0002');
  });

  it('should preserve error messages and descriptions', () => {
    expect(appErrorTable.errors.TEST_ERROR.getMessage()).toBe(
      APP_ERROR_TABLE_ARGUMENTS_SAMPLE.errors.TEST_ERROR.message,
    );
    expect(appErrorTable.errors.TEST_ERROR.description).toBe(
      APP_ERROR_TABLE_ARGUMENTS_SAMPLE.errors.TEST_ERROR.description,
    );
  });

  it('should set correct reference for each error', () => {
    expect(appErrorTable.errors.TEST_ERROR.reference).toBe('TEST_ERROR');
    expect(appErrorTable.errors.ANOTHER_ERROR.reference).toBe('ANOTHER_ERROR');
  });

  it('should handle message templates with parameters', () => {
    expect(appErrorTable.errors.ANOTHER_ERROR.getMessage({ param: 'test value' })).toBe(
      'Another test message with test value',
    );
  });
});
