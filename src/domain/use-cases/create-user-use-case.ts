import { CreateUserParams } from "../models/create-user";
import { User } from "../models/user";

export interface ICreateUserUseCase {
  create: (input: CreateUserParams) => Promise<User>;
}
