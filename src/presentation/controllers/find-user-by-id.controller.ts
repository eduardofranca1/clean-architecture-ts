import { User } from '@/domain/models/user';
import { RequestValidationError } from '@/application/errors/request-validator-error';
import { IFindUserByIdUseCase } from '@/domain/use-cases/find-user-by-id-use-case';
import { Controller } from '../protocols/controller/controller';
import { RequestModel } from '../protocols/requests/request-model';
import { ResponseHandler } from '../protocols/responses/response-handler';

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
