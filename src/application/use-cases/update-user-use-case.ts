import { UpdateUserUseCase } from '@/domain/use-cases/update-user-use-case';
import { UpdateUserRepository } from '../protocols/repositories/update-user.repository';
import { FindUserByIdRepository } from '../protocols/repositories/find-user-by-id.repository';
import { NotFoundError } from '../errors/not-found-error';
import { FindUserByEmailRepository } from '../protocols/repositories/find-user-by-email.repository';
import { BadRequestError } from '../errors/bad-request-error';
import { ValidationComposite } from '../protocols/validation/validation-composite';

export class UpdateUser implements UpdateUserUseCase {
  constructor(
    private readonly updateUserRepository: UpdateUserRepository,
    private readonly findUserByIdRepository: FindUserByIdRepository,
    private readonly findUserByEmailRepository: FindUserByEmailRepository,
    private readonly validation: ValidationComposite,
  ) {}
  async update(id: string, request: { name?: string; email?: string }): Promise<void> {
    await this.validation.validate(request);

    const user = await this.findUserByIdRepository.findById(id);
    if (!user) throw new NotFoundError('User not found');

    if (user.email !== request.email) {
      await this.checkEmail(request.email);
    }

    await this.updateUserRepository.update(id, { name: request.name, email: request.email });
  }

  private async checkEmail(emailToUpdate?: string) {
    if (emailToUpdate) {
      const result = await this.findUserByEmailRepository.findByEmail(emailToUpdate);
      if (result) throw new BadRequestError('E-mail already in use');
    }
  }
}
