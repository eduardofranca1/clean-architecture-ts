import { User } from '../models/user';

export interface FindAllUsersRequest {
  orderBy?: string;
  order?: 'desc' | 'asc';
  limit?: number;
  skip?: number;
}

export interface FindAllUsersUseCase {
  findAll(request?: FindAllUsersRequest): Promise<User[]>;
}
