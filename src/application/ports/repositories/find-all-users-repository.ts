import { User } from '../../../domain/models/user';

export interface IFindAllUsersRepository {
  findAll(): Promise<User[]>;
}
