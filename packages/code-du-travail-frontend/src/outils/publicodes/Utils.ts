import { FormContent } from "../common/type/WizardType";
import { PublicodesResult, PublicodesUnit } from "./index";

/**
 * Take the form values from react-final-form and transform to a flat object for publicodes.
 */
export const mapToPublicodesSituation = (
  form: FormContent
): Record<string, string> => {
  const { ccn, infos, seniorityGreaterThanTwoYears, ...formWithoutCcn } = form;
  const seniority =
    seniorityGreaterThanTwoYears === true
      ? { "contrat salarié - ancienneté": "24" }
      : {};
  if (ccn) {
    return {
      "contrat salarié - convention collective": `'IDCC${ccn.num
        .toString()
        .padStart(4, "0")}'`,
      ...infos,
      ...formWithoutCcn,
      ...seniority,
    };
  }
  return {
    ...infos,
    ...formWithoutCcn,
    ...seniority,
  };
};

export const reverseValues = (
  values: Record<string, string>
): Record<string, string> =>
  Object.entries(values).reduce((state, [key, value]) => {
    state[value] = key;
    return state;
  }, {});

export const convertDaysIntoBetterUnit = (
  days: string | number
): PublicodesResult => {
  const parsedDay = typeof days === "string" ? parseFloat(days) : days;
  const isDay = parsedDay === 1;
  const isConvertibleIntoWeek = parsedDay % 7 === 0;
  if (isConvertibleIntoWeek) {
    const parsedWeek = parsedDay / 7;
    const isWeek = parsedWeek === 1;
    return {
      unit: isWeek ? PublicodesUnit.WEEK : PublicodesUnit.WEEKS,
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
      unit: PublicodesUnit.MONTH,
      value: parsedMonth,
      valueInDays: parsedDay,
    };
  }
  return {
    unit: isDay ? PublicodesUnit.DAY : PublicodesUnit.DAYS,
    value: parsedDay,
    valueInDays: parsedDay,
  };
};

export function isFloat(n: number): boolean {
  return Number(n) === n && n % 1 !== 0;
}
