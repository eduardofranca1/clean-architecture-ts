import { CreateUserParams } from "../../domain/models/create-user";
import { User } from "../../domain/models/user";

export interface ICreateUserRepository {
  create(data: CreateUserParams): Promise<User>;
}
