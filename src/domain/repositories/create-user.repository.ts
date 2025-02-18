import { CreateUserParams } from "../types/create-user";
import { UserModel } from "../models/user";

export interface ICreateUserRepository {
  create(data: CreateUserParams): Promise<UserModel>;
}
