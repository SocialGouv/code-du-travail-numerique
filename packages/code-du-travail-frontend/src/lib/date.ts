enum Unit {
  DAY,
  WEEK,
  MONTH,
  YEAR,
}

const MappingUnit = [
  {
    key: Unit.DAY,
    label: ["jour", "jours"],
  },
  {
    key: Unit.WEEK,
    label: ["semaine", "semaines"],
  },
  {
    key: Unit.MONTH,
    label: ["mois"],
  },
  {
    key: Unit.YEAR,
    label: ["année", "années", "an", "ans"],
  },
];

export enum Extra {
  OPEN,
  FROM_TO,
  MID,
  CALENDAR,
}

const MappingExtra = [
  {
    key: Extra.OPEN,
    label: ["ouvrés", "ouvré"],
  },
  {
    key: Extra.FROM_TO,
    label: ["de date à date"],
  },
  {
    key: Extra.MID,
    label: ["et demi"],
  },
  {
    key: Extra.CALENDAR,
    label: ["calendaires", "calendaire"],
  },
];

enum Month {
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

export const convertPeriodToHumanDate = (
  input: string,
  from: Date
): string | null => {
  let date: Date;
  let weekendDays = 0;
  let extra: Extra | undefined;
  const splitString = input.split(" ");
  if (splitString.length <= 1) {
    return null;
  }
  let firstElement = parseInt(splitString[0]);
  if (isNaN(firstElement)) {
    return null;
  }
  const secondElement = splitString[1];
  const unit: Unit | undefined = MappingUnit.find(
    (v) => v.label.includes(secondElement) === true
  )?.key;
  if (unit === undefined) {
    return null;
  }
  if (splitString.length > 2) {
    const otherElements = splitString.slice(2).join(" ");
    extra = MappingExtra.find(
      (v) => v.label.includes(otherElements) === true
    )?.key;
    if (extra === undefined) {
      return null;
    }
  }
  if (extra === Extra.OPEN) {
    return null;
  }
  if (firstElement === 15 && unit === Unit.DAY) {
    firstElement = 14;
  }
  date = convertDate(from, firstElement + weekendDays, unit);
  if (extra === Extra.MID) {
    if (unit !== Unit.MONTH) {
      return null;
    }
    date = convertDate(date, 14, Unit.DAY);
  }
  return dateToString(date, !isTheSameYear(date, from));
};

export const getExtra = (input: string): Extra | null => {
  let extra: Extra | null = null;
  const splitString = input.split(" ");
  if (splitString.length > 2) {
    const otherElements = splitString.slice(2).join(" ");
    MappingExtra.forEach((v) => {
      if (v.label.includes(otherElements)) {
        extra = v.key;
      }
    });
    return extra;
  }
  return null;
};

const convertDate = (date: Date, value: number, unit: Unit): Date => {
  let localDate = new Date(date);
  switch (unit) {
    case Unit.DAY:
      return addDay(localDate, value);
    case Unit.WEEK:
      return addWeek(localDate, value);
    case Unit.MONTH:
      return addMonth(localDate, value);
    case Unit.YEAR:
      return addYear(localDate, value);
  }
};

const addDay = (date: Date, day: number): Date => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + day);
  return newDate;
};

const addWeek = (date: Date, week: number): Date => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + week * 7);
  return newDate;
};

const addMonth = (date: Date, month: number): Date => {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + month);
  return newDate;
};

const addYear = (date: Date, year: number): Date => {
  const newDate = new Date(date);
  newDate.setFullYear(newDate.getFullYear() + year);
  return newDate;
};

const isTheSameYear = (date1: Date, date2: Date): boolean => {
  return date1.getFullYear() === date2.getFullYear();
};

export const dateToString = (date: Date, withYear = false): string => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return withYear
    ? `${day} ${Month[month].toString()} ${year}`
    : `${day} ${Month[month].toString()}`;
};
