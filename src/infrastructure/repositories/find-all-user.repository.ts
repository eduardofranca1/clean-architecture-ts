import { IFindAllUsersRepository } from '../../application/ports/repositories/find-all-users-repository';
import { User } from '../../domain/models/user';
import { MongoClient } from '../database/mongo-client';

export class FindAllUsersRepository implements IFindAllUsersRepository {
  async findAll(
    orderBy: string,
    order: 'desc' | 'asc',
    limit: number,
    skip: number,
  ): Promise<User[]> {
    const userCollection = MongoClient.getCollection<User>('users');
    return await userCollection
      .find()
      .sort({ [orderBy]: order === 'asc' ? 1 : -1 })
      .limit(Number(limit))
      .skip(Number(skip))
      .toArray();
  }
}
