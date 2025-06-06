import { User } from '@/domain/models/user';

export interface FindUserByEmailRepository {
  findByEmail(email: string): Promise<User | null>;
}
