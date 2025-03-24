import { parse as rootParse, parseISO, format } from "date-fns";

export const dateFormat = "dd/MM/yyyy";

export const parse = (str: string | undefined) => {
  if (!str) {
    return parseISO(new Date().toISOString().split("T")[0]);
  }
  if (parseISO(str).toString() === "Invalid Date") {
    return rootParse(str, dateFormat, new Date());
  }
  return parseISO(str);
};

export const dateToString = (d: Date) => {
  return format(d, dateFormat);
};

export const isISODateFormat = (date: string): boolean => {
  return /^\d{4}-\d{2}-\d{2}$/.test(date);
};

export const isFrenchDateFormat = (date: string): boolean => {
  return /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.test(date);
};

export const convertFrToISODate = (frDate: string): string => {
  if (!frDate || !isFrenchDateFormat(frDate)) return frDate;
  const [day, month, year] = frDate.split("/");
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

export const convertISOToFrDate = (isoDate: string): string => {
  if (!isoDate || !isISODateFormat(isoDate)) return isoDate;
  const [year, month, day] = isoDate.split("-");
  return `${day}/${month}/${year}`;
};
