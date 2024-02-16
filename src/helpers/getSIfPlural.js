export const getSIfPlural = (num) => {
  if (typeof num !== 'number' || num < 0) {
    throw Error("getSIfPlural's Number cannot be less than 0");
  }
  return num > 1 ? 's' : '';
};
