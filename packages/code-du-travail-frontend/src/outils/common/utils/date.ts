import { parse as rootParse, parseISO } from "date-fns";

export const parse = (str: string | undefined) => {
  if (!str) {
    return parseISO(new Date().toISOString().split("T")[0]);
  }
  if (parseISO(str).toString() === "Invalid Date") {
    return rootParse(str, "dd/MM/yyyy", new Date());
  }
  return parseISO(str);
};

export default parse;
