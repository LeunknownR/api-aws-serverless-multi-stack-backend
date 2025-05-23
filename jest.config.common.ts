/* eslint-disable @typescript-eslint/no-explicit-any */
import { pathsToModuleNameMapper } from 'ts-jest';
import { JestConfigWithTsJest } from 'ts-jest';

type CoverageThresholdMetrics = {
  branches: number;
  functions: number;
  lines: number;
  statements: number;
};
type JestConfigArgs = {
  compilerOptions: Record<string, any>;
  thresholds?: CoverageThresholdMetrics;
};
const DEFAULT_COVERATE_THRESHOLD: CoverageThresholdMetrics = {
  branches: 70,
  functions: 80,
  lines: 80,
  statements: 80,
};
export default function generateJestConfig({ compilerOptions, thresholds }: JestConfigArgs): JestConfigWithTsJest {
  return {
    verbose: true,
    preset: 'ts-jest',
    testEnvironment: 'node',
    rootDir: '.',
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths!, {
      prefix: '<rootDir>/',
    }),
    testMatch: ['**/*.test.ts'],
    modulePathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/.esbuild/', '<rootDir>/coverage/'],
    coveragePathIgnorePatterns: ['node_modules', '<rootDir>/.esbuild/', '<rootDir>/coverage/', '<rootDir>/tests/'],
    coverageReporters: ['json-summary'],
    coverageThreshold: {
      global: thresholds || DEFAULT_COVERATE_THRESHOLD,
    },
  };
}
