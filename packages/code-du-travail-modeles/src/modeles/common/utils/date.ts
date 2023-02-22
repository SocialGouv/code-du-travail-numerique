import { parse } from "date-fns";

import type { Absence, SalaryPeriods } from "..";

/**
 *
 * @param array est un tableau qui contient des objets avec les propriétés mois et valeur.
 * Ici nous nous intéressons à la propriété mois.
 * @returns ordered array of months
 */
export const rankByMonthArrayDescFrench = (
  array: SalaryPeriods[]
): SalaryPeriods[] => {
  try {
    return array.sort((a, b) => {
      const monthA = monthToNumber(getMonth(a.month));
      const monthB = monthToNumber(getMonth(b.month));
      const yearA = getYear(a.month);
      const yearB = getYear(b.month);
      if (yearA > yearB) {
        return -1;
      } else if (yearA < yearB) {
        return 1;
      } else if (yearA === yearB && monthA > monthB) {
        return -1;
      } else if (yearA === yearB && monthA < monthB) {
        return 1;
      }
      return 0;
    });
  } catch {
    return array;
  }
};

export const getMonth = (value: string): string => {
  if (!value) return "";
  return value.split(" ")[0] ?? "";
};

export const getYear = (value: string): number => {
  if (!value) return 0;
  const v = value.split(" ")[1] ?? "";
  return Number(v.replace(/[^0-9]/g, ""));
};

export const parseDate = (value: string): Date => {
  return parse(value, "dd/MM/yyyy", new Date());
};

export const monthToNumber = (month: string): number => {
  if (!month) return 0;
  switch (true) {
    case month
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .includes("janvier"):
      return 1;
    case month
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .includes("fevrier"):
      return 2;
    case month
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .includes("mars"):
      return 3;
    case month
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .includes("avril"):
      return 4;
    case month
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .includes("mai"):
      return 5;
    case month
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .includes("juin"):
      return 6;
    case month
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .includes("juillet"):
      return 7;
    case month
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .includes("aout"):
      return 8;
    case month
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .includes("septembre"):
      return 9;
    case month
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .includes("octobre"):
      return 10;
    case month
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .includes("novembre"):
      return 11;
    case month
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .includes("decembre"):
      return 12;
    default:
      return 0;
  }
};

export const calculateDurationByYear = (
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
