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

export const convertDate = (date: Date, value: number, unit: Unit): Date => {
  let localDate = new Date(date);
  switch (unit) {
    case Unit.DAY:
      return addDay(localDate, value);
    case Unit.WEEK:
      return addWeek(localDate, value);
    case Unit.MONTH:
      return addMonth(localDate, value);
  }
};

export const addDay = (date: Date, day: number): Date => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + day);
  return newDate;
};

export const addWeek = (date: Date, week: number): Date =>
  addDay(date, week * 7);

export const addMonth = (date: Date, month: number): Date => {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + month);
  return newDate;
};

export const dateToString = (date: Date): string => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  return `${day} ${Month[month].toString()}`;
};
