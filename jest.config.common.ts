/* eslint-disable @typescript-eslint/no-explicit-any */
import { pathsToModuleNameMapper } from 'ts-jest';
import type { JestConfigWithTsJest } from 'ts-jest';

export default function generateJestConfig(compilerOptions: Record<string, any>): JestConfigWithTsJest {
  return {
    verbose: true,
    preset: 'ts-jest',
    testEnvironment: 'node',
    rootDir: '.',
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths!, {
      prefix: '<rootDir>/',
    }),
    setupFilesAfterEnv: ['<rootDir>/tests/config/test.setup.ts'],
    testMatch: ['**/*.test.ts'],
    modulePathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/.esbuild/', '<rootDir>/coverage/'],
    coveragePathIgnorePatterns: ['node_modules', '<rootDir>/.esbuild/', '<rootDir>/coverage/', '<rootDir>/tests/'],
    coverageReporters: ['json-summary'],
    coverageThreshold: {
      global: {
        branches: 70,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
  };
}
