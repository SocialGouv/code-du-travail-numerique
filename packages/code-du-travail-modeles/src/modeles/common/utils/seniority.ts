import {
  add,
  areIntervalsOverlapping,
  getOverlappingDaysInIntervals,
  isWithinInterval,
  parse,
  set,
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
  const startYear = begin.getFullYear();
  const endYear = end.getFullYear();
  if (endYear < startYear) {
    return [];
  }
  if (startYear === endYear) {
    return [{ begin, end }];
  }

  const years = createYearArray(startYear, endYear);
  return years.reduce<YearDetail[]>((periods, current) => {
    const beginFromYear = set(begin, { year: current });
    if (current === endYear) {
      return periods.concat({
        begin: set(beginFromYear, { year: current }),
        end: end,
      });
    }
    return periods.concat({
      begin: beginFromYear,
      end: sub(add(beginFromYear, { years: 1 }), { days: 1 }),
    });
  }, []);
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

const DAYS_IN_ONE_MONTH = 30;

const absenceInYear = (absence: Absence, year: YearDetail): boolean => {
  if (!absence.startedAt) return false;
  if (!absence.durationInMonth) return false;
  const absenceStartAt = parse(absence.startedAt, "dd/MM/yyyy", new Date());
  const absenceEndAt = add(absenceStartAt, {
    days: DAYS_IN_ONE_MONTH * absence.durationInMonth,
  });
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
  const absenceEndAt = add(absenceStartAt, {
    days: DAYS_IN_ONE_MONTH * absence.durationInMonth,
  });
  if (absenceStartAt >= year.begin && absenceEndAt <= year.end) {
    return absence.durationInMonth;
  }
  return (
    getOverlappingDaysInIntervals(
      { end: absenceEndAt, start: absenceStartAt },
      { end: year.end, start: year.begin }
    ) / DAYS_IN_ONE_MONTH
  );
};

const createYearArray = (start: number, end: number): number[] => {
  const initialYear: number[] = [];
  for (let i = start; i <= end; i++) {
    initialYear.push(i);
  }
  return initialYear;
};
