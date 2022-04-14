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
  let extra = getExtra(input);
  if (
    (value === 15 && unit === Unit.DAY) ||
    (unit === Unit.DAY && extra && extra === Extra.CALENDAR)
  )
    value--;
  date = convertDate(from, value, unit);
  if (extra === Extra.MID && unit === Unit.MONTH) {
    date = convertDate(date, 13, Unit.DAY);
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
  let firstElement = Number(splitString[0]);
  if (isNaN(firstElement)) {
    return null;
  }
  return firstElement;
};

export const getExtra = (input: string): Extra | null => {
  for (var extra of Object.values(Extra)) {
    if (input.includes(extra)) {
      return extra;
    }
  }
  return null;
};

export const getUnit = (input: string): Unit | null => {
  for (var unit of Object.values(Unit)) {
    if (input.includes(unit)) {
      return unit;
    }
  }
  return null;
};
