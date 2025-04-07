import { IFindAllUsersRepository } from '../../application/ports/repositories/find-all-users-repository';
import { User } from '../../domain/models/user';
import { MongoClient } from '../database/mongo-client';

export class FindAllUsersRepository implements IFindAllUsersRepository {
  async findAll(): Promise<User[]> {
    const userCollection = MongoClient.getCollection<User>('users');
    return await userCollection.find().toArray();
  }
}
