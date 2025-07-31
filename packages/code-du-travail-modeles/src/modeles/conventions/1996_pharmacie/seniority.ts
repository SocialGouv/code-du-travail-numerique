import { addDays, differenceInMonths } from "date-fns";

import { LEGAL_MOTIFS } from "../../base/seniority";
import type {
  Absence,
  Motif,
  RequiredSeniorityResult,
  SeniorityProps,
  SeniorityRequiredProps,
  SeniorityResult,
  SupportedCc,
} from "../../common";
import {
  accumulateAbsenceByYear,
  parseDate,
  splitBySeniorityCalendarYear,
} from "../../common";
import { MotifKeys } from "../../common/motif-keys";
import { SeniorityDefault } from "../../common/seniority";

const getTotalAbsenceNonPro = (
  dEntree: Date,
  dSortie: Date,
  absencePeriods: Absence[]
): number => {
  let hasBenefitedFromReduction = false;
  let hasYearLongAbsence = false;
  const absences = absencePeriods.filter(
    (item) => item.motif.key === MotifKeys.maladieNonPro
  );
  const years = splitBySeniorityCalendarYear(dEntree, dSortie);

  const absencesBySeniorityYear = accumulateAbsenceByYear(absences, years);

  let totalAbsence = absencesBySeniorityYear.reduce((total, item) => {
    if (item.totalAbsenceInMonth <= 6 && item.totalAbsenceInMonth > 0) {
      hasBenefitedFromReduction = true;
      return total;
    }
    if (item.totalAbsenceInMonth > 11.9) {
      // cela correspond à une absence de 12 mois
      hasYearLongAbsence = true;
      return total + Math.round(item.totalAbsenceInMonth);
    }
    return total + Math.round(Math.min(item.totalAbsenceInMonth, 6));
  }, 0);

  if (hasYearLongAbsence && !hasBenefitedFromReduction) {
    totalAbsence -= 6;
  }
  return totalAbsence;
};

export class Seniority1996 extends SeniorityDefault<SupportedCc.default> {
  computeSeniority({
    dateEntree,
    dateSortie,
    absencePeriods = [],
  }: SeniorityProps<SupportedCc.default>): SeniorityResult {
    return this.compute(dateEntree, dateSortie, absencePeriods);
  }

  computeRequiredSeniority({
    dateEntree,
    dateNotification,
    absencePeriods = [],
  }: SeniorityRequiredProps<SupportedCc.default>): RequiredSeniorityResult {
    return this.compute(dateEntree, dateNotification, absencePeriods);
  }

  getMotifs(): Motif[] {
    return MOTIFS_1996;
  }

  protected compute(
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
  if (item.key === MotifKeys.maladieNonPro) {
    return {
      ...item,
      startAt: () => true,
      value: 1,
    };
  }
  return item;
});
