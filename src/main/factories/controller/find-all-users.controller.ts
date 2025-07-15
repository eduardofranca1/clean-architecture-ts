import { FindAllUsers } from '@/application/use-cases/find-all-users-use-case';
import { FindAllUsersValidation } from '@/application/validation/leaf/find-all-users-validation';
import { User } from '@/domain/models/user';
import { FindAllUsersMongoRepository } from '@/infrastructure/repositories/find-all-user.repository';
import { FindAllUsersController } from '@/presentation/controllers/find-all-users.controller';
import { GenericSuccessResponse } from '@/presentation/responses/generic-success-response';

export const findAllUsersControllerFactory = () => {
  const findAllUsersRepository = new FindAllUsersMongoRepository();
  const findAllUsersValidation = new FindAllUsersValidation();
  const findAllUsersUseCase = new FindAllUsers(findAllUsersRepository, findAllUsersValidation);
  const genericSuccessPresenter = new GenericSuccessResponse<User[]>();
  const findAllUsersController = new FindAllUsersController(findAllUsersUseCase, genericSuccessPresenter);
  return {
    findAllUsersController,
  };
};
