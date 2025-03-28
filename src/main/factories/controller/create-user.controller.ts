import { ICreateUserRepository } from "../../../application/ports/repositories/create-user-repository";
import { CreateUserUseCase } from "../../../application/use-cases/create-user-use-case";
import { CreateUserMongoRepository } from "../../../infrastructure/repositories/create-user-mongo.repository";
import { CreateUserContoller } from "../../../presentation/controllers/create-user.controller";
import { GenericCreatedResponse } from "../../../presentation/responses/generic-created-response";

export const createUserControllerFactory = () => {
  const createUserRepository: ICreateUserRepository =
    new CreateUserMongoRepository();

  const createUserUseCase = new CreateUserUseCase(createUserRepository);

  const createdUserPresenter = new GenericCreatedResponse();

  const createUserController = new CreateUserContoller(
    createUserUseCase,
    createdUserPresenter
  );

  return {
    createUserRepository,
    createUserUseCase,
    createdUserPresenter,
    createUserController,
  };
};
