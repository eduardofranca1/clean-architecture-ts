import { NotFoundError } from '@/application/errors/not-found-error';
import { IFindUserByIdRepository } from '@/application/ports/repositories/find-user-by-id.repository';
import { ValidationComposite } from '@/application/ports/validation/validation-composite';
import { FindUserByIdUseCase } from '@/application/use-cases/find-user-by-id-use-case';
import { User } from '@/domain/models/user';

const sutFactory = () => {
  const findUserByIdRepositoryMock = findUserByIdRepositoryMockFactory();
  const validationMock = validationMockFatory();
  const sut = new FindUserByIdUseCase(
    findUserByIdRepositoryMock,
    validationMock,
  );
  return {
    findUserByIdRepositoryMock,
    validationMock,
    sut,
  };
};

const findUserByIdRepositoryMockFactory = () => {
  class FindUserByIdRepository implements IFindUserByIdRepository {
    async findById(_request: string): Promise<User | null> {
      return userMockFactory()[0];
    }
  }
  return new FindUserByIdRepository();
};

const validationMockFatory = () => {
  class ValidationMock extends ValidationComposite {
    async validate(_id: unknown): Promise<void> | never {}
  }
  return new ValidationMock();
};

const userMockFactory = () => {
  return [
    {
      id: '1',
      name: 'Leticia',
      email: 'leticia@email.com',
    },
  ];
};

describe('Find_User_By_Id_Use_Case', () => {
  it('should return a user if exists', async () => {
    const { sut } = sutFactory();
    const result = await sut.findById('1');
    expect(result).toEqual(userMockFactory()[0]);
  });

  it('should call findUserByIdRepository with the correct values', async () => {
    const { sut, findUserByIdRepositoryMock } = sutFactory();
    const findUserByIdRepositorySpy = jest.spyOn(
      findUserByIdRepositoryMock,
      'findById',
    );
    await sut.findById('1');
    expect(findUserByIdRepositorySpy).toHaveBeenCalledTimes(1);
    expect(findUserByIdRepositorySpy).toHaveBeenCalledWith('1');
  });

  it('should throw an exception if the user is not found', async () => {
    const { sut, findUserByIdRepositoryMock } = sutFactory();
    jest.spyOn(findUserByIdRepositoryMock, 'findById').mockResolvedValue(null);
    return sut.findById('2').catch((error) => {
      return expect(error).toEqual(new NotFoundError('User not found'));
    });
  });

  it('should call validation with the correct values', async () => {
    const { sut, validationMock } = sutFactory();
    const validationSpy = jest.spyOn(validationMock, 'validate');
    await sut.findById('1');
    expect(validationSpy).toHaveBeenCalledTimes(1);
    expect(validationSpy).toHaveBeenCalledWith('1');
  });
});
