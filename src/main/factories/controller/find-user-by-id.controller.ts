import { FindUserByIdUseCase } from '@/application/use-cases/find-user-by-id-use-case';
import { ValidateUserID } from '@/application/validation/leaf/validate-user-id';
import { User } from '@/domain/models/user';
import { FindUserByIdRepository } from '@/infrastructure/repositories/find-user-by-id.repository';
import { FindUserByIdController } from '@/presentation/controllers/find-user-by-id.controller';
import { GenericSuccessResponse } from '@/presentation/responses/generic-success-response';

export const findUserByIdControllerFactory = () => {
  const findUserByIdRepository = new FindUserByIdRepository();
  const userIdValidation = new ValidateUserID();
  const findUserByIdUseCase = new FindUserByIdUseCase(
    findUserByIdRepository,
    userIdValidation,
  );
  const genericSuccessPresenter = new GenericSuccessResponse<User>();
  const findUserByIdController = new FindUserByIdController(
    findUserByIdUseCase,
    genericSuccessPresenter,
  );
  return {
    findUserByIdController,
  };
};
