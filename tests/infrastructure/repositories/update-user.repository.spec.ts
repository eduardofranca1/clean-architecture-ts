import { MongoClient } from '@/infrastructure/database/mongo-client';
import { UpdateUserMongoRepository } from '@/infrastructure/repositories/update-user.repository';
import env from '@/main/config/env';
import { Collection } from 'mongodb';

let userCollection: Collection;

const makeSut = () => {
  return new UpdateUserMongoRepository();
};

describe('Update_User_Repository', () => {
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

  test('should update a user', async () => {
    const sut = makeSut();
    const { insertedId } = await userCollection.insertOne({
      name: 'first_name',
      email: 'test@email.com',
    });

    await sut.update(insertedId.toHexString(), { name: 'name updated', email: 'update@email.com' });

    const result = await userCollection.findOne({ _id: insertedId });

    expect(result!.name).toBe('name updated');
    expect(result!.email).toBe('update@email.com');
  });
});
