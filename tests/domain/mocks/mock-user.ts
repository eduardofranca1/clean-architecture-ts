import { CreateUserParams } from "../../../src/domain/models/create-user";

export const createUserMock = (): CreateUserParams => ({
  name: "Curry",
  email: "curry@email.com",
});
