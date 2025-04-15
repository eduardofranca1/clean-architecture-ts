import { User } from '../models/user';

export interface IFindUserByIdUseCase {
  findById(id: string): Promise<User>;
}
