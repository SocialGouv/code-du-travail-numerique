import { convertDate, dateToString, Unit } from "../../lib";

export enum Extra {
  OPEN = "ouvré",
  FROM_TO = "de date à date",
  MID = "et demi",
  CALENDAR = "calendaire",
}

export const convertPeriodToHumanDate = (
  input: string,
  from: Date,
  withDay = false
): string | null => {
  let date: Date;
  let value = getValue(input);
  if (!value) return null;
  let unit = getUnit(input);
  if (!unit) return null;
  let extra = getExtra(input);
  if (unit === Unit.DAY && extra !== Extra.FROM_TO) value--;
  date = convertDate(from, value, unit, !extra);
  if (extra === Extra.MID && unit === Unit.MONTH) {
    date = convertDate(date, 15, Unit.DAY);
  } else if (
    (extra === Extra.MID && unit !== Unit.MONTH) || // 1 an et demi / 1 mois et demi
    (value === 0 && unit === Unit.DAY) // 1 jour
  ) {
    return null;
  }
  // Retirer un jour si on a une unité en mois
  if (unit === Unit.MONTH && !extra) date = convertDate(date, -1, Unit.DAY);
  return dateToString(date, withDay);
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
  let extraFound: Extra | null = null;
  for (var extra of Object.values(Extra)) {
    if (input.includes(extra)) {
      extraFound = extra;
    }
  }
  if (!extraFound) {
    const splitString = input.split(" ");
    let firstElement = Number(splitString[0]);
    if (isFloat(firstElement)) {
      return Extra.MID;
    }
  }
  return extraFound;
};

export const getUnit = (input: string): Unit | null => {
  for (var unit of Object.values(Unit)) {
    if (input.includes(unit)) {
      return unit;
    }
  }
  return null;
};

function isFloat(n) {
  return Number(n) === n && n % 1 !== 0;
}

export const generateFrenchDate = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};
