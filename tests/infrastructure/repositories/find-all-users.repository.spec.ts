import { Collection } from 'mongodb';
import { MongoClient } from '@/infrastructure/database/mongo-client';
import { FindAllUsersMongoRepository } from '@/infrastructure/repositories/find-all-user.repository';
import env from '@/main/config/env';

let userCollection: Collection;

const makeSut = (): FindAllUsersMongoRepository => {
  return new FindAllUsersMongoRepository();
};

describe('Find_All_Users_Repository', () => {
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

  test('should return a user list', async () => {
    await userCollection.insertMany([
      {
        name: 'Curry',
        email: 'curry@email.com',
      },
      {
        name: 'Zeus',
        email: 'zeus@email.com',
      },
      {
        name: 'Larissa',
        email: 'larissa@email.com',
      },
      {
        name: 'Paulo',
        email: 'paulo@email.com',
      },
      {
        name: 'Helena',
        email: 'helena@email.com',
      },
      {
        name: 'Maria',
        email: 'maria@email.com',
      },
    ]);

    const sut = makeSut();
    const userList = await sut.findAll('name', 'asc', 5, 0);

    expect(userList).toBeTruthy();
    expect(userList.length).toBe(5);
    expect(userList[0].name).toBe('Curry');
    expect(userList[0].email).toBe('curry@email.com');
  });
});
