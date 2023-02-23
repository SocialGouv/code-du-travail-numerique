import {
  add,
  areIntervalsOverlapping,
  getOverlappingDaysInIntervals,
  isAfter,
  isWithinInterval,
  parse,
  sub,
} from "date-fns";

import type { Absence } from "../types/seniority";
import { parseDate } from "./date";

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

export const calculateDurationByCalendarYear = (
  absencePeriods: Absence[]
): number[] => {
  const absencePeriodsWithStartDate: {
    startedAtDate: Date;
    durationInMonth: number;
  }[] = absencePeriods
    .filter((absencePeriod) => !!absencePeriod.startedAt)
    .filter((absencePeriod) => !!absencePeriod.durationInMonth)
    .map((absencePeriod) => {
      return {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        durationInMonth: absencePeriod.durationInMonth!,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        startedAtDate: parseDate(absencePeriod.startedAt!),
      };
    });

  const durationByYear = absencePeriodsWithStartDate.reduce(
    (total: Record<number, number>, abs) => {
      const startYear = abs.startedAtDate.getFullYear();
      let startMonth = abs.startedAtDate.getMonth();
      let remainingDuration = abs.durationInMonth;

      for (let year = startYear; remainingDuration > 0; year++) {
        const remainingMonthsInYear = 12 - startMonth;
        const durationInCurrentYear = Math.min(
          remainingDuration,
          remainingMonthsInYear
        );

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        total[year] = (total[year] ?? 0) + durationInCurrentYear;

        remainingDuration -= durationInCurrentYear;
        startMonth = 0;
      }

      return total;
    },
    {}
  );

  return Object.values(durationByYear);
};
