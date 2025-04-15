import { ValidationComposite } from '@/application/ports/validation/validation-composite';
import { FindAllUsersRequest } from '@/domain/use-cases/find-all-users-use-case';
import { IFindAllUsersRepository } from '@src/application/ports/repositories/find-all-users-repository';
import { FindAllUsersUseCase } from '@src/application/use-cases/find-all-users-use-case';
import { User } from '@src/domain/models/user';

const sutFactory = () => {
  const findAllUsersRepositoryMock = findAllUsersRepositoryMockFactory();
  const validationMock = validateMockFactory();
  const sut = new FindAllUsersUseCase(
    findAllUsersRepositoryMock,
    validationMock,
  );
  return {
    findAllUsersRepositoryMock,
    validationMock,
    sut,
  };
};

const validateMockFactory = () => {
  class ValidationMock extends ValidationComposite {
    async validate(_request: FindAllUsersRequest): Promise<void> | never {}
  }
  return new ValidationMock();
};

const findAllUsersRepositoryMockFactory = () => {
  class FindAllUsersRepositoryMock implements IFindAllUsersRepository {
    async findAll(): Promise<User[]> {
      return [
        {
          id: '1',
          name: 'Curry',
          email: 'curry@email.com',
        },
        {
          id: '2',
          name: 'Stephen',
          email: 'stephen@email.com',
        },
        {
          id: '3',
          name: 'LeBron',
          email: 'james@email.com',
        },
      ];
    }
  }

  return new FindAllUsersRepositoryMock();
};

describe('Find_All_Users_Use_Case', () => {
  it('it should return a user list', async () => {
    const { sut } = sutFactory();
    const userList = await sut.findAll({
      orderBy: 'name',
      order: 'asc',
      limit: 100,
      skip: 0,
    });
    expect(userList.length).toBeGreaterThan(0);
  });

  it('should call validation with the correct values', async () => {
    const { sut, validationMock } = sutFactory();
    const validationMockSpy = jest.spyOn(validationMock, 'validate');
    await sut.findAll({
      orderBy: 'name',
      order: 'asc',
      limit: 20,
      skip: 0,
    });
    expect(validationMockSpy).toHaveBeenCalledTimes(1);
    expect(validationMockSpy).toHaveBeenCalledWith({
      orderBy: 'name',
      order: 'asc',
      limit: 20,
      skip: 0,
    });
  });

  it('should call findAllUsersRepository with the correct values', async () => {
    const { sut, findAllUsersRepositoryMock } = sutFactory();

    const findAllUsersRepositoryMockSpy = jest.spyOn(
      findAllUsersRepositoryMock,
      'findAll',
    );

    await sut.findAll({
      orderBy: 'name',
      order: 'asc',
      limit: 20,
      skip: 0,
    });

    expect(findAllUsersRepositoryMockSpy).toHaveBeenCalledTimes(1);
    expect(findAllUsersRepositoryMockSpy).toHaveBeenCalledWith(
      'name',
      'asc',
      20,
      0,
    );

    await sut.findAll({ orderBy: 'name' });
    expect(findAllUsersRepositoryMockSpy).toHaveBeenCalledWith(
      'name',
      'asc',
      20,
      0,
    );

    await sut.findAll({ order: 'asc' });
    expect(findAllUsersRepositoryMockSpy).toHaveBeenCalledWith(
      'name',
      'asc',
      20,
      0,
    );

    await sut.findAll({ limit: 20 });
    expect(findAllUsersRepositoryMockSpy).toHaveBeenCalledWith(
      'name',
      'asc',
      20,
      0,
    );

    await sut.findAll({ skip: 5 });
    expect(findAllUsersRepositoryMockSpy).toHaveBeenCalledWith(
      'name',
      'asc',
      20,
      0,
    );
  });
});
