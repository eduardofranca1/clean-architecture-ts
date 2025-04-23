import { IDeleteUserByIdUseCase } from '@/domain/use-cases/delete-user-by-id-use-case';
import { IDeleteUserByIdRepository } from '../protocols/repositories/delete-user-by-id.repository';
import { IFindUserByIdRepository } from '../protocols/repositories/find-user-by-id.repository';
import { NotFoundError } from '../errors/not-found-error';
import { ValidationComposite } from '../protocols/validation/validation-composite';

export class DeleteUserByIdUseCase implements IDeleteUserByIdUseCase {
  constructor(
    private readonly deleteUserByIdRepository: IDeleteUserByIdRepository,
    private readonly findUserByIdRepository: IFindUserByIdRepository,
    private readonly validation: ValidationComposite,
  ) {}
  async deleteById(id: string): Promise<void> {
    await this.validation.validate(id);
    const user = await this.findUserByIdRepository.findById(id);
    if (!user) throw new NotFoundError('User not found');
    await this.deleteUserByIdRepository.deleteById(id);
  }
}
