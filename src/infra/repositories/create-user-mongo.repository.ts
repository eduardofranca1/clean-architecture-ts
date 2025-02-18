import { CreateUserParams } from "../../domain/types/create-user";
import { UserModel } from "../../domain/models/user";
import { ICreateUserRepository } from "../../domain/repositories/create-user.repository";
import { MongoClient } from "../database/mongo-client";

export class CreateUserMongoRepository implements ICreateUserRepository {
  async create(data: CreateUserParams): Promise<UserModel> {
    const userCollection = MongoClient.getCollection("users");
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
