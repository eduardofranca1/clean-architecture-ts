import { IFindAllUsersRepository } from '@src/application/ports/repositories/find-all-users-repository';
import { FindAllUsersUseCase } from '@src/application/use-cases/find-all-users-use-case';
import { User } from '@src/domain/models/user';

const sutFactory = () => {
  const findAllUsersRepositoryMock = findAllUsersRepositoryMockFactory();
  const sut = new FindAllUsersUseCase(findAllUsersRepositoryMock);
  return sut;
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
  test('it should return a user list', async () => {
    const sut = sutFactory();
    const userList = await sut.findAll({
      orderBy: 'name',
      order: 'asc',
      limit: 100,
      skip: 0,
    });
    expect(userList.length).toBeGreaterThan(0);
  });
});
