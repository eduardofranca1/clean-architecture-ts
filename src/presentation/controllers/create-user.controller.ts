import { CreateUserParams } from '@/domain/models/create-user';
import { RequestModel } from '../protocols/requests/request-model';
import { Controller } from '../protocols/controller/controller';
import { User } from '@/domain/models/user';
import { ICreateUserUseCase } from '@/domain/use-cases/create-user-use-case';
import { ResponseHandler } from '../protocols/responses/response-handler';
import { objectKeyExists } from '@/common/helpers/objects/object-key-exists';
import { RequestValidationError } from '@/application/errors/request-validator-error';

type RequestBody = RequestModel<CreateUserParams>;

export class CreateUserContoller implements Controller<User> {
  constructor(
    private readonly createUserUseCase: ICreateUserUseCase,
    private readonly presenter: ResponseHandler<User>,
  ) {}

  async handleRequest(requestModel: RequestBody) {
    if (!objectKeyExists(requestModel, 'body')) {
      throw new RequestValidationError('The request body not found');
    }

    const { name, email } = requestModel.body;

    const result = await this.createUserUseCase.create({
      name,
      email,
    });

    return await this.presenter.response(result);
  }
}
