import { addDays, differenceInMonths } from "date-fns";

import { LEGAL_MOTIFS } from "../../base/seniority";
import type {
  Absence,
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
import { SeniorityDefault } from "../../common/seniority";

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
    if (item.totalAbsenceInMonth <= 6) {
      return total;
    }
    return total + item.totalAbsenceInMonth;
  }, 0);
};

export class Seniority176 extends SeniorityDefault<SupportedCcIndemniteLicenciement.IDCC0176> {
  computeSeniority({
    dateEntree,
    dateSortie,
    absencePeriods = [],
  }: SeniorityProps<SupportedCcIndemniteLicenciement.IDCC0176>): SeniorityResult {
    return this.compute(dateEntree, dateSortie, absencePeriods);
  }

  computeRequiredSeniority({
    dateEntree,
    dateNotification,
    absencePeriods = [],
  }: SeniorityRequiredProps<SupportedCcIndemniteLicenciement.default>): RequiredSeniorityResult {
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
