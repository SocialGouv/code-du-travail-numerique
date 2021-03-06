import { parse as rootParse, parseISO } from "date-fns";

export const parse = (str) => {
  if (parseISO(str).toString() === "Invalid Date") {
    return rootParse(str, "dd/MM/yyyy", new Date());
  }
  return parseISO(str);
};
