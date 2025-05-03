import { UpdateUserRepository } from '@/application/protocols/repositories/update-user.repository';
import { MongoClient } from '../database/mongo-client';
import { ObjectId } from 'mongodb';

export class UpdateUserMongoRepository implements UpdateUserRepository {
  async update(id: string, user: { name: string; email: string }): Promise<void> {
    const userCollection = MongoClient.getCollection('users');
    await userCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name: user.name,
          email: user.email,
        },
      },
    );
  }
}
