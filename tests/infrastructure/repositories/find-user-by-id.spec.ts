import { MongoClient } from '@/infrastructure/database/mongo-client';
import { FindUserByIdMongoRepository } from '@/infrastructure/repositories/find-user-by-id.repository';
import env from '@/main/config/env';
import { Collection } from 'mongodb';

let userCollection: Collection;

const makeSut = (): FindUserByIdMongoRepository => {
  return new FindUserByIdMongoRepository();
};

describe('Find_User_By_ID_Repository', () => {
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

  it('should return a user by id', async () => {
    const { insertedId } = await userCollection.insertOne({
      name: 'first_name',
      email: 'mock@email.com',
    });
    const sut = makeSut();
    const result = await sut.findById(insertedId.toHexString());
    expect(result).toBeTruthy();
  });

  it('should return null if user does not exist', async () => {
    const sut = makeSut();
    const result = await sut.findById('67fe6afe022d4a7558fb1349');
    expect(result).toBeFalsy();
  });
});
