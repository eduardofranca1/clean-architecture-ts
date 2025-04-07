import { User } from '../models/user';

export interface IFindAllUsersUseCase {
  findAll(): Promise<User[]>;
}
