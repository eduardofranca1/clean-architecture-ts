/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserRequiredFieldsValidation } from '@/application/validation/leaf/user-required-fields-validaton';

const sutFactory = () => {
  const sut = new UserRequiredFieldsValidation();
  return {
    sut,
  };
};

describe('User_Required_Fields_Validation', () => {
  it('should return void if the request is valid', async () => {
    const { sut } = sutFactory();

    const result = await sut.validate({
      name: 'name',
      email: 'email@email.com',
    });

    expect(result).toBeUndefined();
  });

  it('should throw an exception if the request is invalid', async () => {
    const { sut } = sutFactory();

    let error;

    try {
      await sut.validate({
        name: '',
        email: 'email@email.com',
      });
    } catch (err: any) {
      error = err;
    }

    expect(error.message).toEqual('Name is required');
  });
});
