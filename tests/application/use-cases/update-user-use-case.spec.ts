/* eslint-disable @typescript-eslint/no-explicit-any */
import { FindUserByEmailRepository } from '@/application/protocols/repositories/find-user-by-email.repository';
import { FindUserByIdRepository } from '@/application/protocols/repositories/find-user-by-id.repository';
import { UpdateUserRepository } from '@/application/protocols/repositories/update-user.repository';
import { ValidationComposite } from '@/application/protocols/validation/validation-composite';
import { UpdateUser } from '@/application/use-cases/update-user-use-case';
import { User } from '@/domain/models/user';

const sutFactory = () => {
  const updateUserRepositoryMock = updateUserRepositoryMockFactory();
  const findUserBydIdRepositoryMock = findUserByIdRepositoryMockFactory();
  const findUserBydEmailRepositoryMock = findUserByEmailRepositoryMockFactory();
  const validationMock = validateMockFactory();
  const sut = new UpdateUser(
    updateUserRepositoryMock,
    findUserBydIdRepositoryMock,
    findUserBydEmailRepositoryMock,
    validationMock,
  );
  return {
    updateUserRepositoryMock,
    findUserBydIdRepositoryMock,
    findUserBydEmailRepositoryMock,
    validationMock,
    sut,
  };
};

const findUserByEmailRepositoryMockFactory = (): FindUserByEmailRepository => {
  class FindUserByEmailRepositoryMock implements FindUserByEmailRepository {
    async findByEmail(_email: string): Promise<User | null> {
      return null;
    }
  }

  return new FindUserByEmailRepositoryMock();
};

const findUserByIdRepositoryMockFactory = () => {
  class FindUserByIdMongoRepository implements FindUserByIdRepository {
    async findById(_request: string): Promise<User | null> {
      return {
        id: '1',
        name: 'Leticia',
        email: 'leticia@email.com',
      };
    }
  }
  return new FindUserByIdMongoRepository();
};

const validateMockFactory = () => {
  class ValidationMock extends ValidationComposite {
    async validate(_request: { name: string; email: string }): Promise<void> | never {}
  }
  return new ValidationMock();
};

const updateUserRepositoryMockFactory = () => {
  class UpdateUserMongoRepository implements UpdateUserRepository {
    async update(_id: string, _user: { name: string; email: string }): Promise<void> {}
  }
  return new UpdateUserMongoRepository();
};

describe('Update_User_Use_Case', () => {
  it('should call the findUserByIdRepository with the correct values', async () => {
    const { sut, findUserBydIdRepositoryMock } = sutFactory();
    const findUserByIdRepositorySpy = jest.spyOn(findUserBydIdRepositoryMock, 'findById');
    await sut.update('1', { name: 'test', email: 'name@email.com' });
    expect(findUserByIdRepositorySpy).toHaveBeenCalledTimes(1);
    expect(findUserByIdRepositorySpy).toHaveBeenCalledWith('1');
  });

  it('should throw an exception if the user is not found', async () => {
    const { sut, findUserBydIdRepositoryMock } = sutFactory();
    jest.spyOn(findUserBydIdRepositoryMock, 'findById').mockResolvedValue(null);
    let error;
    try {
      await sut.update('2', { name: 'test', email: 'name@email.com' });
    } catch (e: any) {
      error = e;
    }
    expect(error.statusCode).toBe(404);
    expect(error.message).toBe('User not found');
  });

  it('should call the findUserByEmailRepository with the correct values', async () => {
    const { sut, findUserBydEmailRepositoryMock } = sutFactory();
    const findUserByEmailRepositorySpy = jest.spyOn(findUserBydEmailRepositoryMock, 'findByEmail');
    await sut.update('dudu@email.com', { name: 'Dudu', email: 'dudu@email.com' });
    expect(findUserByEmailRepositorySpy).toHaveBeenCalledTimes(1);
    expect(findUserByEmailRepositorySpy).toHaveBeenCalledWith('dudu@email.com');
  });

  it('should throw an exception if user email already exists', async () => {
    const { sut, findUserBydEmailRepositoryMock } = sutFactory();
    jest.spyOn(findUserBydEmailRepositoryMock, 'findByEmail').mockResolvedValue({
      id: '1',
      name: 'name',
      email: 'name@email.com',
    });
    let error;
    try {
      await sut.update('2', { name: 'test', email: 'name@email.com' });
    } catch (e: any) {
      error = e;
    }
    expect(error.statusCode).toBe(400);
    expect(error.message).toBe('E-mail already in use');
  });

  it('should call the updateRepository with the correct values', async () => {
    const { sut, updateUserRepositoryMock } = sutFactory();
    const updateUserRepositorySpy = jest.spyOn(updateUserRepositoryMock, 'update');
    await sut.update('1', { name: 'test', email: 'name@email.com' });
    expect(updateUserRepositorySpy).toHaveBeenCalledTimes(1);
    expect(updateUserRepositorySpy).toHaveBeenCalledWith('1', { name: 'test', email: 'name@email.com' });
  });

  it('the updateUserUseCase should return void', async () => {
    const { sut } = sutFactory();
    expect(await sut.update('1', { name: 'test', email: 'name@email.com' })).toBeUndefined();
  });
});
