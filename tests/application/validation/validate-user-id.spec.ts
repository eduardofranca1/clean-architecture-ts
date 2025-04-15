import { ValidateUserID } from '@/application/validation/leaf/validate-user-id';

const sutFactory = () => {
  const sut = new ValidateUserID();
  return {
    sut,
  };
};

describe('Validate_User_Id', () => {
  it('should return void if the request is valid', async () => {
    const { sut } = sutFactory();
    const result = await sut.validate('1');
    expect(result).toBeUndefined();
  });

  it('should throw an exception if the id is empty', async () => {
    const { sut } = sutFactory();

    let error;

    try {
      await sut.validate('');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      error = e;
    }

    expect(error.statusCode).toBe(400);
    expect(error.message).toBe('Invalid user ID');
    expect(error.name).toBe('RequestValidationError');
  });
});
