import { ICreateUserUseCase } from '@/domain/use-cases/create-user-use-case';
import { ICreateUserRepository } from '../ports/repositories/create-user-repository';
import { CreateUserParams } from '@/domain/models/create-user';
import { ValidationComposite } from '../ports/validation/validation-composite';
import { User } from '@/domain/models/user';
import { IFindUserByEmailRepository } from '../ports/repositories/find-user-by-email.repository';
import { UserExistsError } from '../errors/user-exists-error';

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private readonly createUserRepository: ICreateUserRepository,
    private readonly findUserByEmailRepository: IFindUserByEmailRepository,
    private readonly validator: ValidationComposite<CreateUserParams>,
  ) {}
  async create(input: CreateUserParams): Promise<User> {
    await this.validator.validate(input);

    const findUserEmail = await this.findUserByEmailRepository.findByEmail(
      input.email,
    );

    if (findUserEmail) {
      throw new UserExistsError('User already exists');
    }

    const result = await this.createUserRepository.create(input);
    return result;
  }
}
