import { addDays, format } from "date-fns";
import { parse, dateFormat } from "../../common/utils/date";

export const dateOneDayLater = (date: string) => {
  const dateProlonged = addDays(parse(date), 1);
  return format(dateProlonged, dateFormat);
};
