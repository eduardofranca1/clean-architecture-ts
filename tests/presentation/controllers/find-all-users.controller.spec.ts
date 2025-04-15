import { ResponseHandler } from '@src/application/ports/responses/response-handler';
import { ResponseModel } from '@src/application/ports/responses/response-model';
import { User } from '@src/domain/models/user';
import {
  FindAllUsersRequest,
  IFindAllUsersUseCase,
} from '@src/domain/use-cases/find-all-users-use-case';
import { FindAllUsersController } from '@src/presentation/controllers/find-all-users.controller';

const sutFactory = () => {
  const useCaseMock = useCaseMockFactory();
  const presenterMock = presenterMockFactory();
  const sut = new FindAllUsersController(useCaseMock, presenterMock);
  return {
    useCaseMock,
    presenterMock,
    sut,
  };
};

const userDataMockFactory = () => {
  return [
    {
      id: '1',
      name: 'LeBron',
      email: 'james@email.com',
    },
    {
      id: '2',
      name: 'Helena',
      email: 'helena@email.com',
    },
    {
      id: '3',
      name: 'João',
      email: 'joao@email.com',
    },
    {
      id: '4',
      name: 'Lucia',
      email: 'lucia@email.com',
    },
    {
      id: '5',
      name: 'Bia',
      email: 'bia@email.com',
    },
    {
      id: '6',
      name: 'Zeus',
      email: 'zeus@email.com',
    },
  ];
};

const useCaseMockFactory = () => {
  class UseCase implements IFindAllUsersUseCase {
    async findAll(_request: FindAllUsersRequest): Promise<User[]> {
      return userDataMockFactory();
    }
  }
  return new UseCase();
};

const presenterMockFactory = () => {
  class PresenterMock implements ResponseHandler<User[]> {
    async response(_body: User[]): Promise<ResponseModel<User[]>> {
      return {
        statusCode: 200,
        body: userDataMockFactory(),
      };
    }
  }
  return new PresenterMock();
};

describe('Find_All_Users_Controller', () => {
  it('should return 200 status code and the response', async () => {
    const { sut } = sutFactory();
    const response = await sut.handleRequest();
    expect(response).toEqual({
      statusCode: 200,
      body: userDataMockFactory(),
    });
  });

  it('should call the use case with the correct values', async () => {
    const { sut, useCaseMock } = sutFactory();
    const useCaseSpy = jest.spyOn(useCaseMock, 'findAll');
    await sut.handleRequest({
      query: { orderBy: 'name', order: 'asc', limit: 20, skip: 0 },
    });
    expect(useCaseSpy).toHaveBeenCalledTimes(1);
    expect(useCaseSpy).toHaveBeenCalledWith({
      orderBy: 'name',
      order: 'asc',
      limit: 20,
      skip: 0,
    });
  });

  it('should call presenter with the use case result', async () => {
    const { sut, presenterMock } = sutFactory();
    const presenterSpy = jest.spyOn(presenterMock, 'response');
    await sut.handleRequest();
    expect(presenterSpy).toHaveBeenCalledTimes(1);
    expect(presenterSpy).toHaveBeenCalledWith(userDataMockFactory());
  });
});
