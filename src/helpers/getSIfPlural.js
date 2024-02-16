export const getSIfPluralErrorMessage =
  "getSIfPlural's Number type must be number and cannot be less than 0";

export const getSIfPlural = (num) => {
  if (typeof num !== 'number' || num < 0) {
    throw new Error(getSIfPluralErrorMessage);
  }
  return num > 1 ? 's' : '';
};
