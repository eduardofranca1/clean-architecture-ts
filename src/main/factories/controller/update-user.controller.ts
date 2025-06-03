import { UpdateUser } from '@/application/use-cases/update-user-use-case';
import { UpdateUserValidation } from '@/application/validation/composite/update-user-validation';
import { FindUserByEmailMongoRepository } from '@/infrastructure/repositories/find-user-by-email.repository';
import { FindUserByIdMongoRepository } from '@/infrastructure/repositories/find-user-by-id.repository';
import { UpdateUserMongoRepository } from '@/infrastructure/repositories/update-user.repository';
import { UpdateUserController } from '@/presentation/controllers/update-user.controller';
import { GenericNoContentResponse } from '@/presentation/responses/generic-no-content-response';

export const updateUserControllerFactory = () => {
  const updateUserRepository = new UpdateUserMongoRepository();
  const findUserByIdRepository = new FindUserByIdMongoRepository();
  const findUserByEmailRepository = new FindUserByEmailMongoRepository();
  const updateUserValidation = new UpdateUserValidation();
  const updateUserUseCase = new UpdateUser(
    updateUserRepository,
    findUserByIdRepository,
    findUserByEmailRepository,
    updateUserValidation,
  );
  const updateUserPresenter = new GenericNoContentResponse();
  const updateUserController = new UpdateUserController(updateUserUseCase, updateUserPresenter);
  return {
    updateUserController,
  };
};
