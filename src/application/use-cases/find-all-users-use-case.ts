import { User } from '../../domain/models/user';
import { IFindAllUsersUseCase } from '../../domain/use-cases/find-all-users-use-case';
import { IFindAllUsersRepository } from '../ports/repositories/find-all-users-repository';

export class FindAllUsersUseCase implements IFindAllUsersUseCase {
  constructor(
    private readonly findALLUsersRepository: IFindAllUsersRepository,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.findALLUsersRepository.findAll();
  }
}
