import { Collection } from 'mongodb';
import { MongoClient } from '@src/infrastructure/database/mongo-client';
import { CreateUserMongoRepository } from '@src/infrastructure/repositories/create-user-mongo.repository';
import { createUserMock } from '@tests/domain/mocks/mock-user';
import env from '@/main/config/env';

let userCollection: Collection;

const makeSut = (): CreateUserMongoRepository => {
  return new CreateUserMongoRepository();
};

describe('Create_User_Repository', () => {
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

  test('should create a user successfully', async () => {
    const sut = makeSut();

    const result = await sut.create(createUserMock());

    const count = await userCollection.countDocuments();
    expect(count).toBe(1);
    expect(result).toHaveProperty('id');
    expect(result.name).toBe('Curry');
    expect(result.email).toBe('curry@email.com');
  });
});
