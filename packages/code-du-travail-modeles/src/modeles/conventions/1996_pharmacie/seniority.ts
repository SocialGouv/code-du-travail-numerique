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
    return total + Math.max(item.totalAbsenceInMonth - 6, 0);
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

const MOTIFS_1996: Motif[] = LEGAL_MOTIFS.map((item) => {
  if (item.key === MotifKeys.congesPaternite) {
    return {
      ...item,
      value: 0,
    };
  }
  if (item.key === MotifKeys.maladieNonPro) {
    return {
      ...item,
      startAt: () => true,
      value: 1,
    };
  }
  return item;
});
