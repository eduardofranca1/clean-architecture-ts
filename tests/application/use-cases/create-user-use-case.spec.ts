import { UserExistsError } from '@/application/errors/user-exists-error';
import { IFindUserByEmailRepository } from '@/application/ports/repositories/find-user-by-email.repository';
import { ValidationComposite } from '@/application/ports/validation/validation-composite';
import { ICreateUserRepository } from '@src/application/ports/repositories/create-user-repository';
import { CreateUserUseCase } from '@src/application/use-cases/create-user-use-case';
import { CreateUserParams } from '@src/domain/models/create-user';
import { User } from '@src/domain/models/user';
import {
  createUserRequestFactory,
  userResponseFactory,
} from '@tests/domain/mocks/mock-user';

const createUserRepositoryMockFactory = (): ICreateUserRepository => {
  class CreateUserRepositoryMock implements ICreateUserRepository {
    async create(_data: CreateUserParams): Promise<User> {
      return {
        id: '1',
        name: 'first_name',
        email: 'name@email.com',
      };
    }
  }

  return new CreateUserRepositoryMock();
};

const findUserByEmailRepositoryMockFactory = (): IFindUserByEmailRepository => {
  class FindUserByEmailRepositoryMock implements IFindUserByEmailRepository {
    async findByEmail(_email: string): Promise<User | null> {
      return null;
    }
  }

  return new FindUserByEmailRepositoryMock();
};

const validateMockFactory = () => {
  class ValidationMock extends ValidationComposite {
    async validate(_request: CreateUserParams): Promise<void> | never {}
  }
  return new ValidationMock();
};

const sutFactory = () => {
  const userRequestMock = createUserRequestFactory();
  const createUserRepositoryMock = createUserRepositoryMockFactory();
  const findUserByEmailRepositoryMock = findUserByEmailRepositoryMockFactory();
  const validationMock = validateMockFactory();
  const sut = new CreateUserUseCase(
    createUserRepositoryMock,
    findUserByEmailRepositoryMock,
    validationMock,
  );

  return {
    userRequestMock,
    findUserByEmailRepositoryMock,
    createUserRepositoryMock,
    sut,
  };
};

describe('Create_Use_Use_Case', () => {
  it('should create a new user and return the user created', async () => {
    const { sut, userRequestMock } = sutFactory();

    const result = await sut.create(userRequestMock.body);
    const expectedUser = userResponseFactory();

    expect(result).toEqual(expectedUser);
  });

  it('should call user repository with the correct values', async () => {
    const { sut, userRequestMock, createUserRepositoryMock } = sutFactory();

    const createUserRepositoryMockSpy = jest.spyOn(
      createUserRepositoryMock,
      'create',
    );

    await sut.create(userRequestMock.body);

    expect(createUserRepositoryMockSpy).toHaveBeenCalledTimes(1);
    expect(createUserRepositoryMockSpy).toHaveBeenCalledWith(
      userRequestMock.body,
    );
  });

  it('should throw an exception if user already exist', async () => {
    const { sut, userRequestMock, findUserByEmailRepositoryMock } =
      sutFactory();

    jest
      .spyOn(findUserByEmailRepositoryMock, 'findByEmail')
      .mockResolvedValue(userResponseFactory());

    return sut.create(userRequestMock.body).catch((error) => {
      return expect(error).toEqual(new UserExistsError('User already exists'));
    });
  });
});
