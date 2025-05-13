/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteUserByIdUseCase } from '@/domain/use-cases/delete-user-by-id-use-case';
import { DeleteUserByIdController } from '@/presentation/controllers/delete-user-by-id.controller';
import { ResponseHandler } from '@/presentation/protocols/responses/response-handler';
import { ResponseModel } from '@/presentation/protocols/responses/response-model';

const sutFactory = () => {
  const useCaseMock = useCaseMockFactory();
  const presenterMock = presenterMockFactory();
  const sut = new DeleteUserByIdController(useCaseMock, presenterMock);
  return {
    useCaseMock,
    presenterMock,
    sut,
  };
};

const useCaseMockFactory = () => {
  class DeleteUserById implements DeleteUserByIdUseCase {
    async deleteById(_id: string): Promise<void> {}
  }
  return new DeleteUserById();
};

const presenterMockFactory = () => {
  class PresenterMock implements ResponseHandler {
    async response(_params: any): Promise<ResponseModel<void>> {
      return {
        statusCode: 204,
        body: undefined,
      };
    }
  }
  return new PresenterMock();
};

describe('Delete_User_By_Id_Controller', () => {
  it('should return 204 status code no content response', async () => {
    const { sut } = sutFactory();
    const response = await sut.handleRequest({ params: { id: '1' } });
    expect(response).toEqual({
      statusCode: 204,
      body: undefined,
    });
  });

  it('should call the use case with the correct values', async () => {
    const { sut, useCaseMock } = sutFactory();
    const useCaseSpy = jest.spyOn(useCaseMock, 'deleteById');
    await sut.handleRequest({ params: { id: '1' } });
    expect(useCaseSpy).toHaveBeenCalledTimes(1);
    expect(useCaseSpy).toHaveBeenCalledWith('1');
  });

  it('should call the presenter with the correct values', async () => {
    const { sut, presenterMock } = sutFactory();
    const presenterSpy = jest.spyOn(presenterMock, 'response');
    await sut.handleRequest({ params: { id: '1' } });
    expect(presenterSpy).toHaveBeenCalledTimes(1);
    expect(presenterSpy).toHaveBeenCalledWith();
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
});
