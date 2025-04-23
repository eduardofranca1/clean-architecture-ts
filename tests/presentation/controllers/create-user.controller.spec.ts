/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateUserContoller } from '@src/presentation/controllers/create-user.controller';
import { ICreateUserUseCase } from '@src/domain/use-cases/create-user-use-case';
import { CreateUserParams } from '@src/domain/models/create-user';
import { User } from '@src/domain/models/user';
import { ResponseHandler } from '@/presentation/protocols/responses/response-handler';
import { ResponseModel } from '@/presentation/protocols/responses/response-model';

const sutFactory = () => {
  const useCaseMock = useCaseMockFactory();
  const presenterMock = presenterMockFactory();
  const sut = new CreateUserContoller(useCaseMock, presenterMock);
  return {
    useCaseMock,
    presenterMock,
    sut,
  };
};

const useCaseMockFactory = () => {
  class UseCaseMock implements ICreateUserUseCase {
    async create(_input: CreateUserParams): Promise<User> {
      return responseDataMockFactory();
    }
  }
  return new UseCaseMock();
};

const responseDataMockFactory = () => {
  return {
    id: '1',
    name: 'Curry',
    email: 'curry@email.com',
  };
};

const presenterMockFactory = () => {
  class PresenterMock implements ResponseHandler<User> {
    async response(_body: any): Promise<ResponseModel<User>> {
      return {
        statusCode: 201,
        body: responseDataMockFactory(),
      };
    }
  }
  return new PresenterMock();
};

const requestDataMockFactory = () => {
  const response = responseDataMockFactory();
  return {
    body: {
      name: response.name,
      email: response.email,
    },
  };
};

describe('Create_User_Controller', () => {
  it('should return 201 status code and the body result', async () => {
    const { sut } = sutFactory();
    const response = await sut.handleRequest(requestDataMockFactory());
    expect(response).toEqual({
      statusCode: 201,
      body: responseDataMockFactory(),
    });
  });

  it('should call presenter with the use case result', async () => {
    const { sut, presenterMock } = sutFactory();
    const presenterSpy = jest.spyOn(presenterMock, 'response');
    await sut.handleRequest(requestDataMockFactory());
    expect(presenterSpy).toHaveBeenCalledTimes(1);
    expect(presenterSpy).toHaveBeenCalledWith(responseDataMockFactory());
  });

  it('should throw error if request.body does not exist', async () => {
    const { sut } = sutFactory();
    let error: any;

    try {
      await sut.handleRequest('' as any);
    } catch (requestError) {
      error = requestError;
    }

    expect(error.name).toBe('RequestValidationError');
    expect(error.message).toBe('The request body not found');
    expect(error.statusCode).toBe(400);
  });

  it('shoull call use case with the correct values', async () => {
    const { sut, useCaseMock } = sutFactory();
    const useCaseSpy = jest.spyOn(useCaseMock, 'create');
    await sut.handleRequest(requestDataMockFactory());
    expect(useCaseSpy).toHaveBeenCalledTimes(1);
    expect(useCaseSpy).toHaveBeenCalledWith(requestDataMockFactory().body);
  });
});
