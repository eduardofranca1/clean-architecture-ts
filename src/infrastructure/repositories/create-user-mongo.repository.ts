import { ICreateUserRepository } from '@/application/protocols/repositories/create-user-repository';
import { CreateUserParams } from '@/domain/models/create-user';
import { User } from '@/domain/models/user';
import { MongoClient } from '../database/mongo-client';

export class CreateUserMongoRepository implements ICreateUserRepository {
  async create(data: CreateUserParams): Promise<User> {
    const userCollection = MongoClient.getCollection('users');
    const { insertedId } = await userCollection.insertOne({
      name: data.name,
      email: data.email,
    });
    return {
      id: insertedId.toHexString(),
      name: data.name,
      email: data.email,
    };
  }
}
