import { CreateUserContoller } from '@/presentation/controllers/create-user.controller';
import { CreateUserUseCase } from '@/application/use-cases/create-user-use-case';
import { CreateUserMongoRepository } from '@/infrastructure/repositories/create-user-mongo.repository';
import { GenericCreatedResponse } from '@/presentation/responses/generic-created-response';
import { User } from '@/domain/models/user';
import { CreateUserValidation } from '@/application/validation/composite/create-user-validation';

export const createUserControllerFactory = () => {
  const createUserRepository = new CreateUserMongoRepository();

  const createUserValition = new CreateUserValidation();

  const createUserUseCase = new CreateUserUseCase(
    createUserRepository,
    createUserValition,
  );

  const createdUserPresenter = new GenericCreatedResponse<User>();

  const createUserController = new CreateUserContoller(
    createUserUseCase,
    createdUserPresenter,
  );

  return {
    createUserRepository,
    createUserUseCase,
    createdUserPresenter,
    createUserController,
    createUserValition,
  };
};
