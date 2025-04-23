import { DeleteUserByIdUseCase } from '@/domain/use-cases/delete-user-by-id-use-case';
import { DeleteUserByIdRepository } from '../protocols/repositories/delete-user-by-id.repository';
import { FindUserByIdRepository } from '../protocols/repositories/find-user-by-id.repository';
import { NotFoundError } from '../errors/not-found-error';
import { ValidationComposite } from '../protocols/validation/validation-composite';

export class DeleteUserById implements DeleteUserByIdUseCase {
  constructor(
    private readonly deleteUserByIdRepository: DeleteUserByIdRepository,
    private readonly findUserByIdRepository: FindUserByIdRepository,
    private readonly validation: ValidationComposite,
  ) {}
  async deleteById(id: string): Promise<void> {
    await this.validation.validate(id);
    const user = await this.findUserByIdRepository.findById(id);
    if (!user) throw new NotFoundError('User not found');
    await this.deleteUserByIdRepository.deleteById(id);
  }
}
