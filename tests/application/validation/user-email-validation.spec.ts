/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserEmailValidator } from '@/application/validation/leaf/user-email-validation';
import { EmailValidationAdapter } from '@/common/adapters/validations/email-validation-adapter';

const sutFactory = () => {
  const sut = new UserEmailValidator(new EmailValidationAdapter());
  return {
    sut,
  };
};

const requestDataFactory = () => {
  return {
    name: 'name',
    email: 'test@email.com',
  };
};

describe('User_Email_Validation', () => {
  it('should return void if the request is valid', async () => {
    const { sut } = sutFactory();
    const result = await sut.validate(requestDataFactory());
    expect(result).toBeUndefined();
  });

  it('should not validate if there is no request', async () => {
    const { sut } = sutFactory();
    const result = await sut.validate();
    expect(result).toBeUndefined();
  });

  it('should not validate if the email is undefined', async () => {
    const { sut } = sutFactory();
    const data = requestDataFactory();
    data.email = undefined as any;
    const result = await sut.validate(data);
    expect(result).toBeUndefined();
  });

  it('should throw an email exception if the email is invalid', async () => {
    const { sut } = sutFactory();

    const data = requestDataFactory();
    data.email = 'email';

    let error;

    try {
      await sut.validate({
        name: 'name',
        email: 'emailemail.com',
      });
    } catch (err: any) {
      error = err;
    }

    expect(error.statusCode).toBe(400);
    expect(error.message).toBe('Invalid e-mail');
    expect(error.name).toBe('EmailValidationError');
  });
});
