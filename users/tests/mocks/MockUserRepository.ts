import User from '/opt/nodejs/domain/entities/User';
import UserRepository from '/opt/nodejs/domain/repositories/UserRepository';

export default class MockUserRepository implements UserRepository {
  constructor(private readonly users: User[]) {}
  async getUserById(id: string): Promise<User | null> {
    return this.users.find(user => user.id === id) || null;
  }
  async registerUser(user: User): Promise<boolean> {
    this.users.push(user);
    return true;
  }
}
