import { RequestValidationError } from '@/application/errors/request-validator-error';
import { Controller } from '@/application/ports/controllers/controller';
import { RequestModel } from '@/application/ports/requests/request-model';
import { ResponseHandler } from '@/application/ports/responses/response-handler';
import { IDeleteUserByIdUseCase } from '@/domain/use-cases/delete-user-by-id-use-case';

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
