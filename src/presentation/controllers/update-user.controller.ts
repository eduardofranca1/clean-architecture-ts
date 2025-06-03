import { UpdateUserUseCase } from '@/domain/use-cases/update-user-use-case';
import { Controller } from '../protocols/controller/controller';
import { RequestModel } from '../protocols/requests/request-model';
import { ResponseHandler } from '../protocols/responses/response-handler';
import { objectKeyExists } from '@/common/helpers/objects/object-key-exists';
import { RequestValidationError } from '@/application/errors/request-validator-error';
import { removeObjectEmptyKeys } from '@/common/helpers/objects/remove-object-empty.keys';

type Request = RequestModel<{ name?: string; email?: string }, { id: string }>;

export class UpdateUserController implements Controller {
  constructor(
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly presenter: ResponseHandler<void>,
  ) {}
  async handleRequest(requestModel: Request) {
    if (
      !objectKeyExists(requestModel, 'body') ||
      !objectKeyExists(requestModel, 'params') ||
      !objectKeyExists(requestModel.params, 'id')
    ) {
      throw new RequestValidationError('Invalid request');
    }

    const { id } = requestModel.params;
    const { body } = requestModel;

    await this.updateUserUseCase.update(id, removeObjectEmptyKeys(body));
    return await this.presenter.response();
  }
}
