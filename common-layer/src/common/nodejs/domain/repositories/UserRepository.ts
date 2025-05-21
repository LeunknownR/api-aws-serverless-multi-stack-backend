import User from '../entities/User';

export default interface UserRepository {
  getUserById(userId: string): Promise<User | null>;
  registerUser(user: User): Promise<boolean>;
}
