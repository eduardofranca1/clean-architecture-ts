import { Collection } from 'mongodb';
import { MongoClient } from '../../../src/infrastructure/database/mongo-client';
import { FindAllUsersRepository } from '../../../src/infrastructure/repositories/find-all-user.repository';

let userCollection: Collection;

const makeSut = (): FindAllUsersRepository => {
  return new FindAllUsersRepository();
};

describe('Find_All_Users_Repository', () => {
  beforeAll(async () => {
    await MongoClient.connect();
  });

  afterAll(async () => {
    await MongoClient.disconnect();
  });

  beforeEach(async () => {
    userCollection = MongoClient.getCollection('users');
    await userCollection.deleteMany();
  });

  test('should return a user list', async () => {
    await userCollection.insertOne({
      name: 'Curry',
      email: 'curry@email.com',
    });

    const sut = makeSut();
    const userList = await sut.findAll();

    expect(userList).toBeTruthy();
    expect(userList.length).toBe(1);
    expect(userList[0].name).toBe('Curry');
    expect(userList[0].email).toBe('curry@email.com');
  });
});
