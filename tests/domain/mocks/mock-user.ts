import { CreateUserParams } from "../../../src/domain/types/create-user";

export const mockCreateUserParams = (): CreateUserParams => ({
  name: "Curry",
  email: "curry@email.com",
});
