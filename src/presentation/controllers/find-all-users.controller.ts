import { User } from '@/domain/models/user';
import { IFindAllUsersUseCase } from '@/domain/use-cases/find-all-users-use-case';
import { RequestModel } from '../protocols/requests/request-model';
import { Controller } from '../protocols/controller/controller';
import { ResponseHandler } from '../protocols/responses/response-handler';

type FindAllUsersRequestModel = RequestModel<
  void,
  void,
  {
    orderBy?: string;
    order?: 'asc' | 'desc';
    limit?: number;
    skip?: number;
  }
>;

export class FindAllUsersController implements Controller<User[]> {
  constructor(
    private readonly findAllUsersUseCase: IFindAllUsersUseCase,
    private readonly presenter: ResponseHandler<User[]>,
  ) {}

  async handleRequest(requestModel?: FindAllUsersRequestModel) {
    let query: FindAllUsersRequestModel['query'];

    if (requestModel && requestModel.query) {
      query = requestModel.query;
    }

    const result = await this.findAllUsersUseCase.findAll(query);
    return this.presenter.response(result);
  }
}
