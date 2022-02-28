import { FormContent } from "../../common/type/WizardType";
import {
  PublicodesConvertedUnit,
  PublicodesPreavisRetraiteResult,
} from "../types/preavis-retraite";
import { isFloat } from ".";
import { formatSeniority } from "./common";

export const mapToPublicodesSituationForPreavisDeRetraite = (
  form: FormContent
): Record<string, string> => {
  const {
    ccn,
    infos,
    seniorityMaximum,
    seniorityValue,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    disabledWorker,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    cdt,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    criteria,
    ...formWithoutCcn
  } = form;
  const seniority = {
    "contrat salarié - ancienneté":
      seniorityMaximum && seniorityValue
        ? seniorityValue
        : formatSeniority(form["contrat salarié - ancienneté"] as string),
  };
  const agreement: Record<string, string> = ccn?.selected
    ? {
        "contrat salarié - convention collective": `'IDCC${ccn.selected.num
          .toString()
          .padStart(4, "0")}'`,
      }
    : {};
  return {
    ...infos,
    ...formWithoutCcn,
    ...seniority,
    ...agreement,
    // ...{
    //   "préavis de retraite": "oui",
    // },
  };
};

export const convertDaysIntoBetterUnit = (
  days: string | number
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
