export const getNumber = (value: any) => {
  if (value === undefined) {
    return 0.0;
  }
  let valueNumber = 0.0;
  if (typeof value === 'string') {
    valueNumber = parseFloat(value);
  } else if (typeof value === 'number') {
    valueNumber = value;
  }
  return isNaN(valueNumber) ? 0.0 : valueNumber;
};
