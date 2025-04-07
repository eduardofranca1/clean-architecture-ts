import { Controller } from '../../application/ports/controllers/controller';
import { RequestModel } from '../../application/ports/requests/request-model';
import { ResponseHandler } from '../../application/ports/responses/response-handler';
import { ResponseModel } from '../../application/ports/responses/response-model';
import { User } from '../../domain/models/user';
import { IFindAllUsersUseCase } from '../../domain/use-cases/find-all-users-use-case';

export class FindAllUsersController implements Controller<User[]> {
  constructor(
    private readonly findAllUsersUseCase: IFindAllUsersUseCase,
    private readonly presenter: ResponseHandler<User[]>,
  ) {}

  async handleRequest(
    requestModel: RequestModel,
  ): Promise<ResponseModel<User[]>> {
    const result = await this.findAllUsersUseCase.findAll();
    return this.presenter.response(result);
  }
}
