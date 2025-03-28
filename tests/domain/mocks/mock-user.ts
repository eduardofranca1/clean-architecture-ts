import { CreateUserParams } from "../../../src/domain/models/create-user";

export const mockCreateUserParams = (): CreateUserParams => ({
  name: "Curry",
  email: "curry@email.com",
});
