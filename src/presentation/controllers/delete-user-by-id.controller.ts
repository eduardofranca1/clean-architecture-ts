import { RequestValidationError } from '@/application/errors/request-validator-error';
import { Controller } from '@/presentation/protocols/controller/controller';
import { RequestModel } from '@/presentation/protocols/requests/request-model';
import { IDeleteUserByIdUseCase } from '@/domain/use-cases/delete-user-by-id-use-case';
import { ResponseHandler } from '../protocols/responses/response-handler';

export class DeleteUserByIdController implements Controller {
  constructor(
    private readonly deleteUserByIdUseCase: IDeleteUserByIdUseCase,
    private readonly presenter: ResponseHandler<string>,
  ) {}
  async handleRequest(requestModel: RequestModel<void, { id: string }>) {
    if (!requestModel || !requestModel.params || !requestModel.params.id) {
      throw new RequestValidationError('The request params not found');
    }
    const { id } = requestModel.params;
    await this.deleteUserByIdUseCase.deleteById(id);
    return await this.presenter.response('OK');
  }
}
