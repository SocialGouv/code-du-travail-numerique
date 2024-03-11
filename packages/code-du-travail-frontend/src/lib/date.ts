export enum Month {
  janvier = 1,
  février = 2,
  mars = 3,
  avril = 4,
  mai = 5,
  juin = 6,
  juillet = 7,
  août = 8,
  septembre = 9,
  octobre = 10,
  novembre = 11,
  décembre = 12,
}

export enum Unit {
  DAY = "jour",
  WEEK = "semaine",
  MONTH = "mois",
}

export enum Day {
  DIMANCHE = "dimanche",
  LUNDI = "lundi",
  MARDI = "mardi",
  MERCREDI = "mercredi",
  JEUDI = "jeudi",
  VENDREDI = "vendredi",
  SAMEDI = "samedi",
}

const days = [
  Day.DIMANCHE,
  Day.LUNDI,
  Day.MARDI,
  Day.MERCREDI,
  Day.JEUDI,
  Day.VENDREDI,
  Day.SAMEDI,
];

export const convertDate = (
  date: Date,
  value: number,
  unit: Unit,
  isCalendar = false
): Date => {
  let localDate = new Date(date);
  switch (unit) {
    case Unit.DAY:
      return addDay(localDate, value);
    case Unit.WEEK:
      return addWeek(localDate, value, isCalendar);
    case Unit.MONTH:
      return addMonth(localDate, value);
  }
};

export const addDay = (date: Date, day: number): Date => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + day);
  return newDate;
};

export const addWeek = (date: Date, week: number, isCalendar = false): Date =>
  addDay(date, isCalendar ? week * 7 - 1 : week * 7);

export const addMonth = (date: Date, month: number): Date => {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + month);
  return newDate;
};

export const dateToString = (date: Date, withDay = false): string => {
  const day = date.getDay();
  const num = date.getDate();
  const month = date.getMonth() + 1;
  return `${withDay ? `${days[day]} ` : ""}${num} ${Month[month].toString()}`;
};

export const isValidDate = (date: string): boolean => {
  if (date && date.length === 10) {
    const splitParts = date.split("/");
    const day = isNaN(Number(splitParts[0])) ? null : Number(splitParts[0]);
    const month = isNaN(Number(splitParts[1])) ? null : Number(splitParts[1]);
    const year = isNaN(Number(splitParts[2])) ? null : Number(splitParts[2]);
    if (!year || !month || !day) return false;
    const isYearValidated = isYearValid(year);
    const isMonthValidated = isMonthValid(month, year);
    const isDayValidated = isDayValid(day, month, year);
    const isValidDate = /^\d{2}\/\d{2}\/\d{4}$/.test(date);
    return isYearValidated && isMonthValidated && isDayValidated && isValidDate;
  }
  return false;
};

function isYearValid(year: number): boolean {
  return year >= 1900 && year <= 2100;
}

function isMonthValid(month: number, year: number): boolean {
  const date = new Date(year, month - 1, 1);
  return date && date.getMonth() + 1 === month;
}

function isDayValid(day: number, month: number, year: number): boolean {
  const date = new Date(year, month - 1, day);
  return date && date.getMonth() + 1 === month && date.getDate() === day;
}
