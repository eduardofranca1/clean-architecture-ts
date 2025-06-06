import { FindAllUsersRepository } from '@/application/protocols/repositories/find-all-users-repository';
import { User } from '@/domain/models/user';
import { MongoClient } from '../database/mongo-client';

export class FindAllUsersMongoRepository implements FindAllUsersRepository {
  async findAll(orderBy: string, order: 'asc' | 'desc', limit: number, skip: number): Promise<User[]> {
    const userCollection = MongoClient.getCollection<User>('users');
    return await userCollection
      .find()
      .sort({ [orderBy]: order === 'asc' ? 1 : -1 })
      .limit(Number(limit))
      .skip(Number(skip))
      .toArray();
  }
}
