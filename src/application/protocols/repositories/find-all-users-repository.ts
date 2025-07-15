import { User } from '@/domain/models/user';

export interface FindAllUsersRepository {
  findAll(orderBy: string, order: 'asc' | 'desc', limit: number, skip: number): Promise<User[]>;
}
