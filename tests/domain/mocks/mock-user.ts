import { CreateUserParams } from '@/domain/models/create-user';

export const createUserMock = (): CreateUserParams => ({
  name: 'Curry',
  email: 'curry@email.com',
});

export const userResponseFactory = () => {
  return {
    id: '1',
    name: 'first_name',
    email: 'name@email.com',
  };
};

export const createUserRequestFactory = () => {
  return {
    body: {
      name: 'first_name',
      email: 'name@email.com',
    },
  };
};
