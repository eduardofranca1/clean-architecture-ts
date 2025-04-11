import { User } from '@/domain/models/user';

export interface IFindUserByEmailRepository {
  findByEmail(email: string): Promise<User | null>;
}
