export const isValidDate = (date: string): boolean => {
  if (date && date.length === 10) {
    const splitParts = date.split("/");
    const day = isNaN(Number(splitParts[0])) ? null : Number(splitParts[0]);
    const month = isNaN(Number(splitParts[1])) ? null : Number(splitParts[1]);
    const year = isNaN(Number(splitParts[2])) ? null : Number(splitParts[2]);
    const isYearValid = year && year >= 1900 && year <= 2100 ? true : false;
    const isMonthValid = month && month >= 1 && month <= 12 ? true : false;
    const isDayValid = day && day >= 1 && day <= 31 ? true : false;
    const isValidDate = /^\d{2}\/\d{2}\/\d{4}$/.test(date);
    return isYearValid && isMonthValid && isDayValid && isValidDate;
  }
  return false;
};
