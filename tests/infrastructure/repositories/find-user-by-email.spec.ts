import { Collection } from 'mongodb';
import { MongoClient } from '@/infrastructure/database/mongo-client';
import { FindUserByEmailMongoRepository } from '@/infrastructure/repositories/find-user-by-email.repository';
import env from '@/main/config/env';

let userCollection: Collection;

const makeSut = (): FindUserByEmailMongoRepository => {
  return new FindUserByEmailMongoRepository();
};

describe('Find_User_By_Email_Repository', () => {
  beforeAll(async () => {
    await MongoClient.connect(env.mongoTestsUrl);
  });

  afterAll(async () => {
    await MongoClient.disconnect();
  });

  beforeEach(async () => {
    userCollection = MongoClient.getCollection('users');
    await userCollection.deleteMany();
  });

  it('should return a user by e-mail', async () => {
    await userCollection.insertOne({
      name: 'Curry',
      email: 'curry@email.com',
    });

    const sut = makeSut();
    const result = await sut.findByEmail('curry@email.com');
    expect(result).toBeTruthy();
  });

  it('should return null if user does not exist', async () => {
    const sut = makeSut();
    const result = await sut.findByEmail('name@email.com');
    expect(result).toBeFalsy();
  });
});
