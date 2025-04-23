import { FindUserByEmailRepository } from '@/application/protocols/repositories/find-user-by-email.repository';
import { User } from '@/domain/models/user';
import { MongoClient } from '../database/mongo-client';

export class FindUserByEmailMongoRepository implements FindUserByEmailRepository {
  async findByEmail(email: string): Promise<User | null> {
    const userCollection = MongoClient.getCollection<User>('users');
    return await userCollection.findOne({ email });
  }
}
