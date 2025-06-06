import { CreateUserUseCase } from '@/domain/use-cases/create-user-use-case';
import { CreateUserRepository } from '../protocols/repositories/create-user-repository';
import { CreateUserParams } from '@/domain/models/create-user';
import { ValidationComposite } from '../protocols/validation/validation-composite';
import { User } from '@/domain/models/user';
import { FindUserByEmailRepository } from '../protocols/repositories/find-user-by-email.repository';
import { UserExistsError } from '../errors/user-exists-error';

export class CreateUser implements CreateUserUseCase {
  constructor(
    private readonly createUserRepository: CreateUserRepository,
    private readonly findUserByEmailRepository: FindUserByEmailRepository,
    private readonly validator: ValidationComposite<CreateUserParams>,
  ) {}
  async create(input: CreateUserParams): Promise<User> {
    await this.validator.validate(input);

    const findUserEmail = await this.findUserByEmailRepository.findByEmail(input.email);

    if (findUserEmail) {
      throw new UserExistsError('User already exists');
    }

    const result = await this.createUserRepository.create(input);
    return result;
  }
}
