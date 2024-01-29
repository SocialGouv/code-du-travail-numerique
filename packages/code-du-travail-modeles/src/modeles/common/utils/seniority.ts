import type { Interval } from "date-fns";
import {
  add,
  addMonths,
  areIntervalsOverlapping,
  differenceInCalendarMonths,
  isAfter,
  isWithinInterval,
  max,
  min,
  parse,
  sub,
} from "date-fns";

import type { Absence } from "../types/seniority";

export type YearDetail = {
  begin: Date;
  end: Date;
};

export type AbsencePerYear = {
  year: number;
  totalAbsenceInMonth: number;
};

export const splitBySeniorityYear = (begin: Date, end: Date): YearDetail[] => {
  if (isAfter(begin, end)) {
    return [];
  }
  let periods: YearDetail[] = [];
  let currentYear = begin;
  let nextYear = sub(add(currentYear, { years: 1 }), { days: 1 });
  while (!isAfter(nextYear, end)) {
    periods = periods.concat({
      begin: currentYear,
      end: nextYear,
    });
    currentYear = add(nextYear, { days: 1 });
    nextYear = add(nextYear, { years: 1 });
  }
  return periods.concat({
    begin: currentYear,
    end: end,
  });
};
const JANUARY = 0;
const DECEMBER = 11;
export const splitBySeniorityCalendarYear = (
  begin: Date,
  end: Date
): YearDetail[] => {
  if (isAfter(begin, end)) {
    return [];
  }
  let periods: YearDetail[] = [];
  let currentYear = begin.getFullYear();
  let nextYear = new Date(currentYear + 1, JANUARY, 1);
  while (!isAfter(nextYear, end)) {
    periods = periods.concat({
      begin: new Date(currentYear, JANUARY, 1),
      end: new Date(currentYear, DECEMBER, 31),
    });
    currentYear++;
    nextYear = new Date(currentYear + 1, JANUARY, 1);
  }
  return periods.concat({
    begin: new Date(currentYear, JANUARY, 1),
    end: new Date(currentYear, DECEMBER, 31),
  });
};

export const accumulateAbsenceByYear = (
  absences: Absence[],
  years: YearDetail[]
): AbsencePerYear[] => {
  return years.map((year) => {
    const totalAbsenceInMonth: number = absences
      .filter((absence) => absenceInYear(absence, year))
      .reduce((sum, current) => sum + absenceDurationRatio(current, year), 0);
    return {
      totalAbsenceInMonth,
      year: year.begin.getFullYear(),
    };
  });
};

export const splitByTwelveMonthsRolling = (absences: Absence[]) =>
  splitByTwelveMonthsRollingRec([...absences]);

const splitByTwelveMonthsRollingRec = (
  absences: Absence[],
  currentYear: YearDetail | undefined = undefined,
  acc: YearDetail[] = []
): YearDetail[] => {
  if (absences.length === 0) {
    return acc;
  }
  if (currentYear === undefined) {
    const absence = absences.shift();
    if (!absence || !absence.startedAt) {
      return splitByTwelveMonthsRollingRec(absences, currentYear, acc);
    }
    const absenceDate = parse(absence.startedAt, "dd/MM/yyyy", new Date());
    const year: YearDetail = {
      begin: absenceDate,
      end: sub(add(absenceDate, { months: 12 }), { days: 1 }),
    };
    return splitByTwelveMonthsRollingRec(absences, year, acc.concat(year));
  }
  const absence = absences.shift();
  if (!absence || !absence.startedAt) {
    return splitByTwelveMonthsRollingRec(absences, currentYear, acc);
  }
  const startedAt = parse(absence.startedAt, "dd/MM/yyyy", new Date());
  if (
    isWithinInterval(startedAt, {
      end: currentYear.end,
      start: currentYear.begin,
    })
  ) {
    return splitByTwelveMonthsRollingRec(absences, currentYear, acc);
  }
  const year: YearDetail = {
    begin: startedAt,
    end: sub(add(startedAt, { months: 12 }), { days: 1 }),
  };
  return splitByTwelveMonthsRollingRec(absences, year, acc.concat(year));
};

const absenceInYear = (absence: Absence, year: YearDetail): boolean => {
  if (!absence.startedAt) return false;
  if (!absence.durationInMonth) return false;
  const absenceStartAt = parse(absence.startedAt, "dd/MM/yyyy", new Date());
  const absenceEndAt = addMonths(absenceStartAt, absence.durationInMonth);
  return areIntervalsOverlapping(
    {
      end: absenceEndAt,
      start: absenceStartAt,
    },
    { end: year.end, start: year.begin }
  );
};

const absenceDurationRatio = (absence: Absence, year: YearDetail): number => {
  if (!absence.startedAt) return 0;
  if (!absence.durationInMonth) return 0;
  const absenceStartAt = parse(absence.startedAt, "dd/MM/yyyy", new Date());
  const absenceEndAt = addMonths(absenceStartAt, absence.durationInMonth);
  if (absenceStartAt >= year.begin && absenceEndAt <= year.end) {
    return absence.durationInMonth * absence.motif.value;
  }
  const overlappingMonth = getOverlappingMonthsInterval(
    { end: absenceEndAt, start: absenceStartAt },
    { end: year.end, start: year.begin }
  );
  return overlappingMonth * absence.motif.value;
};

const getOverlappingMonthsInterval = (r1: Interval, r2: Interval) => {
  if (areIntervalsOverlapping(r1, r2)) {
    const start = max([r1.start, r2.start]);
    const end = min([r1.end, r2.end]);
    return differenceInCalendarMonths(end, start);
  } else return 0;
};
