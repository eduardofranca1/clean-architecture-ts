import { CreateUserParams } from "../../domain/models/create-user";
import { User } from "../../domain/models/user";
import { ICreateUserUseCase } from "../../domain/use-cases/create-user-use-case";
import { ICreateUserRepository } from "../ports/create-user-repository";

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}
  async create(input: CreateUserParams): Promise<User> {
    const result = await this.createUserRepository.create(input);
    return result;
  }
}
