import { UserExistsError } from '@/application/errors/user-exists-error';
import { FindUserByEmailRepository } from '@/application/protocols/repositories/find-user-by-email.repository';
import { ValidationComposite } from '@/application/protocols/validation/validation-composite';
import { CreateUserRepository } from '@/application/protocols/repositories/create-user-repository';
import { CreateUser } from '@/application/use-cases/create-user-use-case';
import { CreateUserParams } from '@/domain/models/create-user';
import { User } from '@/domain/models/user';
import { createUserRequestFactory, userResponseFactory } from '@/tests/domain/mocks/mock-user';

const createUserRepositoryMockFactory = (): CreateUserRepository => {
  class CreateUserRepositoryMock implements CreateUserRepository {
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

const findUserByEmailRepositoryMockFactory = (): FindUserByEmailRepository => {
  class FindUserByEmailRepositoryMock implements FindUserByEmailRepository {
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
  const sut = new CreateUser(createUserRepositoryMock, findUserByEmailRepositoryMock, validationMock);

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
    const createUserRepositorySpy = jest.spyOn(createUserRepositoryMock, 'create');
    await sut.create(userRequestMock.body);
    expect(createUserRepositorySpy).toHaveBeenCalledTimes(1);
    expect(createUserRepositorySpy).toHaveBeenCalledWith(userRequestMock.body);
  });

  it('should throw an exception if user already exist', async () => {
    const { sut, userRequestMock, findUserByEmailRepositoryMock } = sutFactory();

    jest.spyOn(findUserByEmailRepositoryMock, 'findByEmail').mockResolvedValue(userResponseFactory());

    return sut.create(userRequestMock.body).catch((error) => {
      return expect(error).toEqual(new UserExistsError('User already exists'));
    });
  });
});
