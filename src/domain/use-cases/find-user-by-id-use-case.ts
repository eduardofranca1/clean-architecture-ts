import { User } from '../models/user';

export interface FindUserByIdUseCase {
  findById(id: string): Promise<User>;
}
