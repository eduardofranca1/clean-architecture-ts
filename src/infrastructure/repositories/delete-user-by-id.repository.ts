import { IDeleteUserByIdRepository } from '@/application/protocols/repositories/delete-user-by-id.repository';
import { MongoClient } from '../database/mongo-client';
import { ObjectId } from 'mongodb';

export class DeleteUserByIdRepository implements IDeleteUserByIdRepository {
  async deleteById(id: string): Promise<void> {
    const userCollection = MongoClient.getCollection('users');
    await userCollection.deleteOne({ _id: new ObjectId(id) });
  }
}
