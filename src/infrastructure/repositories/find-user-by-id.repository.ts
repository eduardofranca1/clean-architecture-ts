import { IFindUserByIdRepository } from '@/application/ports/repositories/find-user-by-id.repository';
import { User } from '@/domain/models/user';
import { MongoClient } from '../database/mongo-client';
import { ObjectId } from 'mongodb';

export class FindUserByIdRepository implements IFindUserByIdRepository {
  async findById(id: string): Promise<User | null> {
    const userCollection = MongoClient.getCollection<User>('users');
    const result = await userCollection.findOne({ _id: new ObjectId(id) });
    if (!result) return null;
    return result;
  }
}
