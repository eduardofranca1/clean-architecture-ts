import { RequestValidationError } from '../../application/errors/request-validator-error';
import { Controller } from '../../application/ports/controllers/controller';
import { RequestModel } from '../../application/ports/requests/request-model';
import { ResponseHandler } from '../../application/ports/responses/response-handler';
import { objectKeyExists } from '../../common/helpers/objects/object-key-exists';
import { CreateUserParams } from '../../domain/models/create-user';
import { User } from '../../domain/models/user';
import { ICreateUserUseCase } from '../../domain/use-cases/create-user-use-case';

type RequestBody = RequestModel<CreateUserParams>;

export class CreateUserContoller implements Controller<User> {
  constructor(
    private readonly createUserUseCase: ICreateUserUseCase,
    private readonly presenter: ResponseHandler,
  ) {}

  async handleRequest(requestModel: RequestBody) {
    if (!objectKeyExists(requestModel, 'body')) {
      throw new RequestValidationError('Missing body');
    }

    const { name, email } = requestModel.body;

    const result = await this.createUserUseCase.create({
      name,
      email,
    });

    return await this.presenter.response(result);
  }
}
