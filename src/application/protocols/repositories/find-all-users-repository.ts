import { User } from '../../../domain/models/user';

export interface IFindAllUsersRepository {
  findAll(
    orderBy: string,
    order: 'asc' | 'desc',
    limit: number,
    skip: number,
  ): Promise<User[]>;
}
