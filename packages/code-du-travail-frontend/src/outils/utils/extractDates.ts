import { convertDate, dateToString, Unit } from "../../lib";

export enum Extra {
  OPEN = "ouvré",
  FROM_TO = "de date à date",
  MID = "et demi",
  CALENDAR = "calendaire",
}

export const convertPeriodToHumanDate = (
  input: string,
  from: Date
): string | null => {
  let date: Date;
  let value = getValue(input);
  if (!value) return null;
  let unit = getUnit(input);
  if (!unit) return null;
  if (value === 15 && unit === Unit.DAY) value--;
  let extra = getExtra(input);
  date = convertDate(from, value, unit);
  if (extra === Extra.MID && unit === Unit.MONTH) {
    date = convertDate(date, 14, Unit.DAY);
  } else if (
    (extra === Extra.MID && unit !== Unit.MONTH) ||
    extra === Extra.OPEN
  ) {
    return null;
  }
  return dateToString(date);
};

export const getValue = (input: string): number | null => {
  const splitString = input.split(" ");
  if (splitString.length <= 1) {
    return null;
  }
  let firstElement = parseInt(splitString[0]);
  if (isNaN(firstElement)) {
    return null;
  }
  return firstElement;
};

export const getExtra = (input: string): Extra | null => {
  let extra: Extra | null = null;
  const splitString = input.split(" ");
  const extraArr = Object.entries(Extra).map(([key, value]) => ({
    id: key,
    value: value,
  }));
  if (splitString.length > 2) {
    const otherElements = splitString.slice(2).join(" ");
    const key = extraArr.find((v) => otherElements.includes(v.value))?.id;
    if (key && key !== Extra.OPEN) {
      extra = Extra[key];
    }
  }
  return extra;
};

export const getUnit = (input: string): Unit | null => {
  let unit: Unit | null = null;
  const splitString = input.split(" ");
  const unitArr = Object.entries(Unit).map(([key, value]) => ({
    id: key,
    value: value,
  }));
  if (splitString.length > 1) {
    const otherElements = splitString.slice(1).join(" ");
    const key = unitArr.find((v) => otherElements.includes(v.value))?.id;
    if (key) {
      unit = Unit[key];
    }
  }
  return unit;
};
