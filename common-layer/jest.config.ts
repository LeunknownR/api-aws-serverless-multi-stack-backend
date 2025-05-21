import generateJestConfig from '../jest.config.common';
import { compilerOptions } from './tsconfig.json';

export default generateJestConfig(compilerOptions);
