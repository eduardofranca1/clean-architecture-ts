export const isAPositiveNumber = (value: string | number): boolean => {
  if (Number.isNaN(+value)) return false;
  if (+value < 0 || Object.is(+value, -0)) return false;
  return true;
};
