// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const removeObjectEmptyKeys = <T extends Record<any, any>>(object: T): T => {
  for (const key in object) {
    if (object[key] === '' || typeof object[key] === 'undefined') {
      delete object[key];
    }
  }
  return object;
};
