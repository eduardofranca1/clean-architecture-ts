import { RequestValidationError } from '@/application/errors/request-validator-error';
import { Controller } from '@/application/ports/controllers/controller';
import { RequestModel } from '@/application/ports/requests/request-model';
import { ResponseHandler } from '@/application/ports/responses/response-handler';
import { User } from '@/domain/models/user';
import { IFindUserByIdUseCase } from '@/domain/use-cases/find-user-by-id-use-case';

export class FindUserByIdController implements Controller<User> {
  constructor(
    private readonly findUserByIdUseCase: IFindUserByIdUseCase,
    private readonly presenter: ResponseHandler<User>,
  ) {}
  async handleRequest(requestModel: RequestModel<void, { id: string }>) {
    if (!requestModel || !requestModel.params || !requestModel.params.id) {
      throw new RequestValidationError('The request params not found');
    }

    const { id } = requestModel.params;

    const result = await this.findUserByIdUseCase.findById(id);

    return await this.presenter.response(result);
  }
}
