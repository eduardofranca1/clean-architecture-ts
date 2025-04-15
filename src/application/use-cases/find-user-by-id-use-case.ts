import { User } from '@/domain/models/user';
import { IFindUserByIdUseCase } from '@/domain/use-cases/find-user-by-id-use-case';
import { IFindUserByIdRepository } from '../ports/repositories/find-user-by-id.repository';
import { NotFoundError } from '../errors/not-found-error';

export class FindUserByIdUseCase implements IFindUserByIdUseCase {
  constructor(
    private readonly findUserByIdRepository: IFindUserByIdRepository,
  ) {}

  async findById(id: string): Promise<User> {
    const user = await this.findUserByIdRepository.findById(id);
    if (!user) throw new NotFoundError('User not found');
    return user;
  }
}
