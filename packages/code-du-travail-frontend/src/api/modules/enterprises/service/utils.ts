export const detectIfPostalCode = (postalCodeOrName: string): boolean => {
  if (/^\d{5}$/.test(postalCodeOrName)) {
    return true;
  }
  return false;
};
