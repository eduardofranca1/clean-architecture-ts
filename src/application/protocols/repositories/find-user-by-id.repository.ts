import { User } from '@/domain/models/user';

export interface IFindUserByIdRepository {
  findById(id: string): Promise<User | null>;
}
