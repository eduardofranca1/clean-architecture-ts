import { removeObjectEmptyKeys } from '@/common/helpers/objects/remove-object-empty.keys';

test('should remove a key if the value is undefined', () => {
  const object = {
    name: 'name',
    email: '',
  };
  const result = removeObjectEmptyKeys(object);
  expect(result).toEqual({
    name: 'name',
  });
});

test('should remove a key if the value is empty', () => {
  const object = {
    name: '',
    email: 'test@email.com',
  };
  const result = removeObjectEmptyKeys(object);
  expect(result).toEqual({
    email: 'test@email.com',
  });
});
