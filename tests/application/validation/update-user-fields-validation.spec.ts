/* eslint-disable @typescript-eslint/no-explicit-any */
import { UpdateUserFieldsValidation } from '@/application/validation/leaf/update-user-fields-validation';

const sutFactory = () => {
  const sut = new UpdateUserFieldsValidation();
  return {
    sut,
  };
};

describe('Update_User_Fields_Validation', () => {
  it('should return void if the request is valid', async () => {
    const { sut } = sutFactory();

    expect(await sut.validate({ name: 'name', email: 'test@email.com' })).toBeUndefined();
  });

  it('should return void if any field does not exist', async () => {
    const { sut } = sutFactory();

    expect(await sut.validate({ name: 'name' })).toBeUndefined();
  });

  it('should throw an exception if the the value of name field is empty', async () => {
    const { sut } = sutFactory();

    let error;

    try {
      await sut.validate({
        name: '',
        email: 'test@email.com',
      });
    } catch (e: any) {
      error = e;
    }

    expect(error.statusCode).toBe(400);
    expect(error.message).toBe('Name is required');
  });

  it('should throw an exception if the value of email field is empty', async () => {
    const { sut } = sutFactory();

    let error;

    try {
      await sut.validate({
        name: 'name',
        email: '',
      });
    } catch (e: any) {
      error = e;
    }

    expect(error.statusCode).toBe(400);
    expect(error.message).toBe('E-mail is required');
  });
});
