import { Collection } from 'mongodb';
import env from '@/main/config/env';
import { MongoClient } from '@/infrastructure/database/mongo-client';
import { DeleteUserByIdMongoRepository } from '@/infrastructure/repositories/delete-user-by-id.repository';

let userCollection: Collection;

const makeSut = (): DeleteUserByIdMongoRepository => {
  return new DeleteUserByIdMongoRepository();
};

describe('Delete_User_By_Id_Repository', () => {
  beforeAll(async () => {
    await MongoClient.connect(env.mongoTestsUrl);
  });

  afterAll(async () => {
    await MongoClient.disconnect();
  });

  it('should delete a user by id and return void', async () => {
    const sut = makeSut();
    userCollection = MongoClient.getCollection('users');
    const { insertedId } = await userCollection.insertOne({
      name: 'first_name',
      email: 'mock@email.com',
    });

    expect(await sut.deleteById(insertedId.toHexString())).toBeUndefined();
  });
});
