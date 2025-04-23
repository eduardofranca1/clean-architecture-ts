import { User } from '@/domain/models/user';

export interface FindUserByIdRepository {
  findById(id: string): Promise<User | null>;
}
