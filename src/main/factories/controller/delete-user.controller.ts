import { DeleteUserById } from '@/application/use-cases/delete-user-by-id-use-case';
import { ValidateUserID } from '@/application/validation/leaf/validate-user-id';
import { DeleteUserByIdMongoRepository } from '@/infrastructure/repositories/delete-user-by-id.repository';
import { FindUserByIdMongoRepository } from '@/infrastructure/repositories/find-user-by-id.repository';
import { DeleteUserByIdController } from '@/presentation/controllers/delete-user-by-id.controller';
import { GenericSuccessResponse } from '@/presentation/responses/generic-success-response';

export const deleteUserByIdControllerFactory = () => {
  const deleteUserByIdRepository = new DeleteUserByIdMongoRepository();
  const findUserByIdRepository = new FindUserByIdMongoRepository();
  const validationUserId = new ValidateUserID();
  const deleteUserByIdUseCase = new DeleteUserById(deleteUserByIdRepository, findUserByIdRepository, validationUserId);
  const genericSuccessPresenter = new GenericSuccessResponse<string>();
  const deleteUserByIdController = new DeleteUserByIdController(deleteUserByIdUseCase, genericSuccessPresenter);
  return {
    deleteUserByIdController,
  };
};
