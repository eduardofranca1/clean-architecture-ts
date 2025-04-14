/* eslint-disable @typescript-eslint/no-explicit-any */
import { FindAllUsersValidation } from '@/application/validation/leaf/find-all-users-validation';

const sutFactory = () => {
  const sut = new FindAllUsersValidation();
  return {
    sut,
  };
};

describe('Find_All_Users_Validation', () => {
  it('should not throw if the request is empty', async () => {
    const { sut } = sutFactory();
    const result = await sut.validate();
    expect(result).toBeUndefined();
  });

  it('should return void if the request is valid', async () => {
    const { sut } = sutFactory();
    const result = await sut.validate({
      orderBy: 'name',
      order: 'asc',
      limit: 10,
      skip: 0,
    });
    expect(result).toBeUndefined();
  });

  it('should throw an exception if orderBy is not a string', async () => {
    const { sut } = sutFactory();
    let error;
    try {
      await sut.validate({
        orderBy: '1',
        order: 'asc',
        limit: 10,
        skip: 0,
      });
    } catch (e: any) {
      error = e;
    }

    expect(error.name).toBe('RequestValidationError');
    expect(error.statusCode).toBe(400);
    expect(error.message).toBe('Order By must be string');
  });

  it('should throw an exception if order is not asc or desc', async () => {
    const { sut } = sutFactory();
    let error;
    try {
      await sut.validate({
        orderBy: 'name',
        order: 'order' as any,
        limit: 10,
        skip: 0,
      });
    } catch (e: any) {
      error = e;
    }

    expect(error.name).toBe('RequestValidationError');
    expect(error.statusCode).toBe(400);
    expect(error.message).toBe('Order must be asc or desc');
  });

  it('Limit must be a positive number', async () => {
    const { sut } = sutFactory();
    let error;
    try {
      await sut.validate({
        orderBy: 'name',
        order: 'asc',
        limit: -1,
        skip: 0,
      });
    } catch (e: any) {
      error = e;
    }

    expect(error.name).toBe('RequestValidationError');
    expect(error.statusCode).toBe(400);
    expect(error.message).toBe('Limit must be a positive number');
  });

  it('Skip must be a positive number', async () => {
    const { sut } = sutFactory();
    let error;
    try {
      await sut.validate({
        orderBy: 'name',
        order: 'asc',
        limit: 10,
        skip: -1,
      });
    } catch (e: any) {
      error = e;
    }

    expect(error.name).toBe('RequestValidationError');
    expect(error.statusCode).toBe(400);
    expect(error.message).toBe('Skip must be a positive number');
  });
});
