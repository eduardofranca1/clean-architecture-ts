import { ICreateUserUseCase } from '@/domain/use-cases/create-user-use-case';
import { ICreateUserRepository } from '../ports/repositories/create-user-repository';
import { CreateUserParams } from '@/domain/models/create-user';
import { ValidationComposite } from '../ports/validation/validation-composite';
import { User } from '@/domain/models/user';

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private readonly createUserRepository: ICreateUserRepository,
    private readonly validator: ValidationComposite<CreateUserParams>,
  ) {}
  async create(input: CreateUserParams): Promise<User> {
    await this.validator.validate(input);
    const result = await this.createUserRepository.create(input);
    return result;
  }
}
