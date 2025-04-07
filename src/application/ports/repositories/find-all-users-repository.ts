import { User } from '../../../domain/models/user';

export interface IFindAllUsersRespository {
  findAll(): Promise<User[]>;
}
