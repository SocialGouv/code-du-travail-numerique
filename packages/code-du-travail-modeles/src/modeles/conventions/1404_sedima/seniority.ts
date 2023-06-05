import { addDays, differenceInMonths } from "date-fns";

import { LEGAL_MOTIFS } from "../../base/seniority";
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
import {
  accumulateAbsenceByYear,
  parseDate,
  splitBySeniorityCalendarYear,
} from "../../common";
import { MotifKeys } from "../../common/motif-keys";

const getTotalAbsenceNonPro = (
  dEntree: Date,
  dSortie: Date,
  absencePeriods: Absence[]
): number => {
  const absences = absencePeriods.filter(
    (item) => item.motif.key === MotifKeys.maladieNonPro
  );
  const years = splitBySeniorityCalendarYear(dEntree, dSortie);

  const absencesBySeniorityYear = accumulateAbsenceByYear(absences, years);

  return absencesBySeniorityYear.reduce((total, item) => {
    return total + Math.min(item.totalAbsenceInMonth, 3);
  }, 0);
};

export class Seniority1404
  implements ISeniority<SupportedCcIndemniteLicenciement.IDCC1404>
{
  computeSeniority({
    dateEntree,
    dateSortie,
    absencePeriods = [],
  }: SeniorityProps<SupportedCcIndemniteLicenciement.IDCC1404>): SeniorityResult {
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
    return LEGAL_MOTIFS.map((item) => {
      if (item.key === MotifKeys.maladieNonPro) {
        return {
          ...item,
          startAt: () => true,
        };
      }
      return item;
    });
  }

  private compute(
    from: string,
    to: string,
    absences: Absence[]
  ): SeniorityResult {
    const dEntree = parseDate(from);
    const dSortie = addDays(parseDate(to), 1);

    const totalAbsenceNonPro = getTotalAbsenceNonPro(
      dEntree,
      dSortie,
      absences
    );

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
