import { User } from '../../domain/models/user';
import { FindAllUsersRequest, IFindAllUsersUseCase } from '../../domain/use-cases/find-all-users-use-case';
import { FindAllUsersRepository } from '../protocols/repositories/find-all-users-repository';
import { ValidationComposite } from '../protocols/validation/validation-composite';

export class FindAllUsersUseCase implements IFindAllUsersUseCase {
  constructor(
    private readonly findAllUsersRepository: FindAllUsersRepository,
    private readonly validator: ValidationComposite<FindAllUsersRequest>,
  ) {}

  async findAll(request?: FindAllUsersRequest): Promise<User[]> {
    let orderBy = 'name';
    let order: 'asc' | 'desc' = 'asc';
    let limit = 20;
    let skip = 0;

    if (request) {
      if (request.orderBy) orderBy = request.orderBy;
      if (request.order) order = request.order;
      if (request.limit) limit = request.limit;
      if (request.skip) skip = request.skip;
    }

    await this.validator.validate({ orderBy, order, limit, skip });

    return await this.findAllUsersRepository.findAll(orderBy, order, limit, skip);
  }
}
