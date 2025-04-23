/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '@/domain/models/user';
import { FindUserByIdUseCase } from '@/domain/use-cases/find-user-by-id-use-case';
import { FindUserByIdController } from '@/presentation/controllers/find-user-by-id.controller';
import { ResponseHandler } from '@/presentation/protocols/responses/response-handler';
import { ResponseModel } from '@/presentation/protocols/responses/response-model';

const sutFactory = () => {
  const useCaseMock = useCaseMockFactory();
  const presenterMock = presenterMockFactory();
  const sut = new FindUserByIdController(useCaseMock, presenterMock);
  return {
    useCaseMock,
    presenterMock,
    sut,
  };
};

const presenterMockFactory = () => {
  class PresenterMock implements ResponseHandler<User> {
    async response(_body: User): Promise<ResponseModel<User>> {
      return {
        statusCode: 200,
        body: userDataMockFactory(),
      };
    }
  }
  return new PresenterMock();
};

const useCaseMockFactory = () => {
  class UseCase implements FindUserByIdUseCase {
    async findById(_id: string): Promise<User> {
      return userDataMockFactory();
    }
  }
  return new UseCase();
};

const userDataMockFactory = () => {
  return {
    id: '1',
    name: 'Mirele',
    email: 'mirele@email.com',
  };
};

describe('Find_User_By_Id_Controller', () => {
  it('should return 200 status code and the response', async () => {
    const { sut } = sutFactory();
    const response = await sut.handleRequest({ params: { id: '1' } });
    expect(response).toEqual({
      statusCode: 200,
      body: userDataMockFactory(),
    });
  });

  it('should call the use case with the correct values', async () => {
    const { sut, useCaseMock } = sutFactory();
    const useCaseSpy = jest.spyOn(useCaseMock, 'findById');
    await sut.handleRequest({ params: { id: '1' } });
    expect(useCaseSpy).toHaveBeenCalledTimes(1);
    expect(useCaseSpy).toHaveBeenCalledWith('1');
  });

  it('should call presenter with the correct values', async () => {
    const { sut, presenterMock } = sutFactory();
    const presenterSpy = jest.spyOn(presenterMock, 'response');
    await sut.handleRequest({ params: { id: '1' } });
    expect(presenterSpy).toHaveBeenCalledTimes(1);
    expect(presenterSpy).toHaveBeenCalledWith(userDataMockFactory());
  });

  it('should throw error if the request does not exist', async () => {
    const { sut } = sutFactory();

    let error;

    try {
      await sut.handleRequest({});
    } catch (e: any) {
      error = e;
    }

    expect(error.name).toBe('RequestValidationError');
    expect(error.statusCode).toBe(400);
    expect(error.message).toBe('The request params not found');
  });

  it('should throw error if the request.params.id does not exist', async () => {
    const { sut } = sutFactory();

    let error;

    try {
      await sut.handleRequest({ params: {} } as any);
    } catch (e: any) {
      error = e;
    }

    expect(error.name).toBe('RequestValidationError');
    expect(error.statusCode).toBe(400);
    expect(error.message).toBe('The request params not found');
  });
});
