import { addDays, differenceInMonths } from "date-fns";

import { LEGAL_MOTIFS } from "../../base";
import type {
  Absence,
  ISeniority,
  Motif,
  RequiredSeniorityResult,
  SeniorityProps,
  SeniorityRequiredProps,
  SeniorityResult,
  SupportedCcIndemniteLicenciement,
} from "../../common";
import { parseDate } from "../../common";
import { MotifKeys } from "../../common/motif-keys";

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
const getTotalAbsenceNonPro = (absencePeriods: Absence[]): number => {
  const durationByYear = calculateDurationByYear(
    absencePeriods.filter((item) => item.motif.key === MotifKeys.maladieNonPro)
  );

  return durationByYear.reduce((total, duration) => {
    return total + Math.max(duration - 6, 0);
  }, 0);
};

export class Seniority1996
  implements ISeniority<SupportedCcIndemniteLicenciement.default>
{
  computeSeniority({
    dateEntree,
    dateSortie,
    absencePeriods = [],
  }: SeniorityProps<SupportedCcIndemniteLicenciement.default>): SeniorityResult {
    return this.compute(dateEntree, dateSortie, absencePeriods);
  }

  computeRequiredSeniority({
    dateEntree,
    dateNotification,
    absencePeriods = [],
  }: SeniorityRequiredProps): RequiredSeniorityResult {
    return this.compute(dateEntree, dateNotification, absencePeriods);
  }

  getMotifs(): Motif[] {
    return MOTIFS_1996;
  }

  private compute(
    from: string,
    to: string,
    absences: Absence[]
  ): SeniorityResult {
    const dEntree = parseDate(from);
    const dSortie = addDays(parseDate(to), 1);

    const totalAbsenceNonPro = getTotalAbsenceNonPro(absences);

    const totalAbsence = absences.reduce((total, item) => {
      const m = this.getMotifs().find((motif) => motif.key === item.motif.key);
      if (item.durationInMonth === undefined || !m) {
        return total;
      }
      if (item.motif.key === MotifKeys.maladieNonPro) {
        return total;
      }
      return total + item.durationInMonth * m.value;
    }, 0);

    return {
      value:
        (differenceInMonths(dSortie, dEntree) -
          totalAbsence -
          totalAbsenceNonPro) /
        12,
    };
  }
}

const MOTIFS_1996: Motif[] = LEGAL_MOTIFS.map((item) => {
  if (item.key === MotifKeys.congesPaternite) {
    return {
      ...item,
      value: 0,
    };
  }
  return item;
});
