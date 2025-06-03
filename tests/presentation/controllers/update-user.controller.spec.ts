/* eslint-disable @typescript-eslint/no-explicit-any */
import { UpdateUserUseCase } from '@/domain/use-cases/update-user-use-case';
import { UpdateUserController } from '@/presentation/controllers/update-user.controller';
import { ResponseHandler } from '@/presentation/protocols/responses/response-handler';
import { ResponseModel } from '@/presentation/protocols/responses/response-model';

const sutFactory = () => {
  const useCaseMock = useCaseMockFactory();
  const presenterMock = presenterMockFactory();
  const sut = new UpdateUserController(useCaseMock, presenterMock);
  return {
    useCaseMock,
    presenterMock,
    sut,
  };
};

const useCaseMockFactory = () => {
  class UseCaseMock implements UpdateUserUseCase {
    async update(_id: string, _user: { name?: string; email?: string }): Promise<void> {}
  }
  return new UseCaseMock();
};

const presenterMockFactory = () => {
  class PresenterMock implements ResponseHandler<void> {
    async response(_body?: any): Promise<ResponseModel<void>> {
      return {
        statusCode: 204,
        body: undefined,
      };
    }
  }
  return new PresenterMock();
};

const requestDataMock = () => {
  return {
    body: {
      name: 'first name',
      email: 'update@email.com',
    },
    params: { id: '1' },
  };
};

describe('Update_User_Controller', () => {
  it('should return 204 status code with no content', async () => {
    const { sut } = sutFactory();
    const response = await sut.handleRequest(requestDataMock());
    expect(response).toEqual({
      statusCode: 204,
    });
  });

  it('should call the use case with the correct values', async () => {
    const { sut, useCaseMock } = sutFactory();
    const useCaseSpy = jest.spyOn(useCaseMock, 'update');
    await sut.handleRequest(requestDataMock());
    expect(useCaseSpy).toHaveBeenCalledTimes(1);
    expect(useCaseSpy).toHaveBeenCalledWith('1', { name: 'first name', email: 'update@email.com' });
  });

  it('should call the presenter with the correct values', async () => {
    const { sut, presenterMock } = sutFactory();
    const presenterSpy = jest.spyOn(presenterMock, 'response');
    await sut.handleRequest(requestDataMock());
    expect(presenterSpy).toHaveBeenCalledTimes(1);
    expect(presenterSpy).toHaveBeenCalledWith();
  });

  it('should throw error if the request.body or request.params does not exist', async () => {
    const { sut } = sutFactory();
    let error;

    try {
      await sut.handleRequest({});
    } catch (e: any) {
      error = e;
    }
    expect(error.name).toBe('RequestValidationError');
    expect(error.statusCode).toBe(400);
    expect(error.message).toBe('Invalid request');
  });
});
