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

export default parse;
