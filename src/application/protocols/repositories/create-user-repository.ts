import { CreateUserParams } from '../../../domain/models/create-user';
import { User } from '../../../domain/models/user';

export interface CreateUserRepository {
  create(data: CreateUserParams): Promise<User>;
}
