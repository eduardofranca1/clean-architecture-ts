import { ICreateUserRepository } from "../../../src/application/ports/repositories/create-user-repository";
import { CreateUserUseCase } from "../../../src/application/use-cases/create-user-use-case";
import { CreateUserParams } from "../../../src/domain/models/create-user";
import { User } from "../../../src/domain/models/user";
import { createUserMock } from "../../domain/mocks/mock-user";

const userResponseFactory = () => {
  return {
    id: "1",
    name: "first_name",
    email: "name@email.com",
  };
};

const createUserRepositoryMockFactory = (): ICreateUserRepository => {
  class CreateUserRepositoryMock implements ICreateUserRepository {
    async create(_data: CreateUserParams): Promise<User> {
      return {
        id: "1",
        name: "first_name",
        email: "name@email.com",
      };
    }
  }

  return new CreateUserRepositoryMock();
};

const sutFactory = () => {
  const userRequestMock = createUserMock();
  const createUserRepositoryMock = createUserRepositoryMockFactory();
  const sut = new CreateUserUseCase(createUserRepositoryMock);

  return {
    userRequestMock,
    createUserRepositoryMock,
    sut,
  };
};

describe("Create_Use_Use_Case", () => {
  it("should create a new user and return the user created", async () => {
    const { sut, userRequestMock } = sutFactory();

    const result = await sut.create(userRequestMock);
    const expectedUser = userResponseFactory();

    expect(result).toEqual(expectedUser);
  });
});
