import { User } from "../../domain/models/user";
import { MongoClient } from "../database/mongo-client";
import { CreateUserParams } from "../../domain/models/create-user";
import { ICreateUserRepository } from "../../application/ports/repositories/create-user-repository";

export class CreateUserMongoRepository implements ICreateUserRepository {
  async create(data: CreateUserParams): Promise<User> {
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
