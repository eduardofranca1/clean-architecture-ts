import { User } from '@/domain/models/user';
import { FindUserByIdUseCase } from '@/domain/use-cases/find-user-by-id-use-case';
import { FindUserByIdRepository } from '../protocols/repositories/find-user-by-id.repository';
import { NotFoundError } from '../errors/not-found-error';
import { ValidationComposite } from '../protocols/validation/validation-composite';

export class FindUserById implements FindUserByIdUseCase {
  constructor(
    private readonly findUserByIdRepository: FindUserByIdRepository,
    private readonly validation: ValidationComposite,
  ) {}

  async findById(id: string): Promise<User> {
    await this.validation.validate(id);
    const user = await this.findUserByIdRepository.findById(id);
    if (!user) throw new NotFoundError('User not found');
    return user;
  }
}
