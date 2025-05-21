import { Singleton, SingletonFunction } from '../utils/singleton';
import ProcessTracker from '../domain/logs/ProcessTracker';
import ConsoleProcessTracker from './console/ConsoleProcessTracker';
import UserRepository from '../domain/repositories/UserRepository';
import InMemoryUserRepository from './in-memory/InMemoryUserRepository';

class ImplementationFactory {
  readonly getUserRepository: SingletonFunction<UserRepository>;
  readonly getProcessTracker: SingletonFunction<ProcessTracker>;
  constructor() {
    this.getUserRepository = Singleton(() => new InMemoryUserRepository());
    this.getProcessTracker = Singleton(() => new ConsoleProcessTracker());
  }
}

export const IMPLEMENTATION_FACTORY = new ImplementationFactory();
