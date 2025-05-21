import User from '../../domain/entities/User';
import UserRepository from '../../domain/repositories/UserRepository';
import InMemoryTable from './InMemoryTable';

export default class InMemoryUserRepository implements UserRepository {
  private readonly table: InMemoryTable<User>;
  constructor() {
    this.table = new InMemoryTable<User>('users');
  }
  registerUser(user: User): Promise<boolean> {
    this.table.add(user.id, user);
    return Promise.resolve(true);
  }
  getUserById(userId: string): Promise<User | null> {
    const user = this.table.get(userId);
    return Promise.resolve(user ?? null);
  }
}
