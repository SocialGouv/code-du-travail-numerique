export const isSiret = (value: string): boolean => {
  const siret = value.replace(/\s/g, "");

  if (!/^\d{14}$/.test(siret)) {
    return false;
  }

  let sum = 0;

  for (let i = 0; i < siret.length; i++) {
    let digit = Number(siret[i]);

    if (i % 2 === 0) {
      digit *= 2;

      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
  }

  return sum % 10 === 0;
};
