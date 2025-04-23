import { CreateUserParams } from '../models/create-user';
import { User } from '../models/user';

export interface CreateUserUseCase {
  create: (input: CreateUserParams) => Promise<User>;
}
