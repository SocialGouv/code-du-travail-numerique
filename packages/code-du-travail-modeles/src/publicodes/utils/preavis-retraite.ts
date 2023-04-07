import { isFloat } from "../../modeles/common";
import type { PublicodesPreavisRetraiteResult } from "../types";
import { PublicodesConvertedUnit } from "../types";

export const convertDaysIntoBetterUnit = (
  days: number | string
): PublicodesPreavisRetraiteResult => {
  const parsedDay = typeof days === "string" ? parseFloat(days) : days;
  const isDay = parsedDay === 1;
  const isConvertibleIntoWeek = parsedDay % 7 === 0;
  if (isConvertibleIntoWeek) {
    const parsedWeek = parsedDay / 7;
    const isWeek = parsedWeek === 1;
    return {
      unit: isWeek
        ? PublicodesConvertedUnit.WEEK
        : PublicodesConvertedUnit.WEEKS,
      value: parsedWeek,
      valueInDays: parsedDay,
    };
  }
  // Hack: publicodes round value when convert months to days.
  // So we loose accuracy, we just look if the value is a float or modulo 365 == 0
  const isConvertibleIntoMonth = isFloat(parsedDay) || parsedDay % 365 === 0;
  if (isConvertibleIntoMonth) {
    const parsedMonth = Math.round(parsedDay / (365 / 12));
    return {
      unit: PublicodesConvertedUnit.MONTH,
      value: parsedMonth,
      valueInDays: parsedDay,
    };
  }
  return {
    unit: isDay ? PublicodesConvertedUnit.DAY : PublicodesConvertedUnit.DAYS,
    value: parsedDay,
    valueInDays: parsedDay,
  };
};
