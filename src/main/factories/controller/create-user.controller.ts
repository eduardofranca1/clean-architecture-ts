import { CreateUserContoller } from '@/presentation/controllers/create-user.controller';
import { CreateUser } from '@/application/use-cases/create-user-use-case';
import { CreateUserMongoRepository } from '@/infrastructure/repositories/create-user-mongo.repository';
import { GenericCreatedResponse } from '@/presentation/responses/generic-created-response';
import { User } from '@/domain/models/user';
import { CreateUserValidation } from '@/application/validation/composite/create-user-validation';
import { FindUserByEmailMongoRepository } from '@/infrastructure/repositories/find-user-by-email.repository';

export const createUserControllerFactory = () => {
  const createUserRepository = new CreateUserMongoRepository();
  const findUserByIdRepository = new FindUserByEmailMongoRepository();
  const createUserValidation = new CreateUserValidation();
  const createUserUseCase = new CreateUser(createUserRepository, findUserByIdRepository, createUserValidation);
  const createdUserPresenter = new GenericCreatedResponse<User>();
  const createUserController = new CreateUserContoller(createUserUseCase, createdUserPresenter);
  return {
    createUserRepository,
    createUserUseCase,
    createdUserPresenter,
    createUserController,
    createUserValidation,
  };
};
