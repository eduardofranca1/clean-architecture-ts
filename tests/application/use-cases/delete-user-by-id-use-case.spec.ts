import { IDeleteUserByIdRepository } from '@src/application/protocols/repositories/delete-user-by-id.repository';
import { IFindUserByIdRepository } from '@src/application/protocols/repositories/find-user-by-id.repository';
import { ValidationComposite } from '@src/application/protocols/validation/validation-composite';
import { DeleteUserByIdUseCase } from '@src/application/use-cases/delete-user-by-id-use-case';
import { User } from '@/domain/models/user';

const sutFactory = () => {
  const deleteUserByIdRepositoryMock = deleteUserByIdRepositoryMockFactory();
  const findUserByIdRepositoryMock = findUserByIdRepositoryMockFactory();
  const validationMock = validationMockFatory();
  const sut = new DeleteUserByIdUseCase(
    deleteUserByIdRepositoryMock,
    findUserByIdRepositoryMock,
    validationMock,
  );
  return {
    deleteUserByIdRepositoryMock,
    findUserByIdRepositoryMock,
    validationMock,
    sut,
  };
};

const deleteUserByIdRepositoryMockFactory = () => {
  class Repository implements IDeleteUserByIdRepository {
    async deleteById(_id: string): Promise<void> {}
  }
  return new Repository();
};

const findUserByIdRepositoryMockFactory = () => {
  class Repository implements IFindUserByIdRepository {
    async findById(_id: string): Promise<User | null> {
      return {
        id: '1',
        name: 'James',
        email: 'james@email.com',
      };
    }
  }
  return new Repository();
};

const validationMockFatory = () => {
  class ValidationMock extends ValidationComposite {
    async validate(_id: unknown): Promise<void> | never {}
  }
  return new ValidationMock();
};

describe('Delete_User_By_Id_Use_Case', () => {
  it('should return void if the user is deleted', async () => {
    const { sut } = sutFactory();
    expect(await sut.deleteById('1')).toBeUndefined();
  });

  it('should call the deleteUserByIdRepository with the correct values', async () => {
    const { sut, deleteUserByIdRepositoryMock } = sutFactory();
    const deleteUserByIdRepositorySpy = jest.spyOn(
      deleteUserByIdRepositoryMock,
      'deleteById',
    );
    await sut.deleteById('1');
    expect(deleteUserByIdRepositorySpy).toHaveBeenCalledTimes(1);
    expect(deleteUserByIdRepositorySpy).toHaveBeenCalledWith('1');
  });

  it('should call the findUserByIdRepository with the correct values', async () => {
    const { sut, findUserByIdRepositoryMock } = sutFactory();
    const findUserByIdRepositorySpy = jest.spyOn(
      findUserByIdRepositoryMock,
      'findById',
    );
    await sut.deleteById('1');
    expect(findUserByIdRepositorySpy).toHaveBeenCalledTimes(1);
    expect(findUserByIdRepositorySpy).toHaveBeenCalledWith('1');
  });

  it('should call validation with the correct values', async () => {
    const { sut, validationMock } = sutFactory();
    const validationSpy = jest.spyOn(validationMock, 'validate');
    await sut.deleteById('1');
    expect(validationSpy).toHaveBeenCalledTimes(1);
    expect(validationSpy).toHaveBeenCalledWith('1');
  });

  it('should throw an exception if the user is not found', async () => {
    const { sut, findUserByIdRepositoryMock } = sutFactory();
    jest.spyOn(findUserByIdRepositoryMock, 'findById').mockResolvedValue(null);
    let error;
    try {
      await sut.deleteById('2');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      error = e;
    }
    expect(error.statusCode).toBe(404);
    expect(error.message).toBe('User not found');
  });
});
