import { Collection } from 'mongodb';
import { MongoClient } from '@/infrastructure/database/mongo-client';
import { CreateUserMongoRepository } from '@/infrastructure/repositories/create-user-mongo.repository';
import env from '@/main/config/env';
import { createUserMock } from '@/tests/domain/mocks/mock-user';

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
