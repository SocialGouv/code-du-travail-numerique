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
  splitBySeniorityYear,
} from "../../common";
import { MotifKeys } from "../../common/motif-keys";

export class Seniority2941
  implements ISeniority<SupportedCcIndemniteLicenciement.IDCC2941>
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
    return MOTIFS_2941;
  }

  private compute(
    from: string,
    to: string,
    absences: Absence[]
  ): SeniorityResult {
    const dEntree = parseDate(from);
    const dSortie = addDays(parseDate(to), 1);

    const totalAbsenceWithoutProAbsence = absences.reduce((total, item) => {
      if (item.durationInMonth === undefined) {
        return 0;
      }
      const m = this.getMotifs().find((motif) => motif.key === item.motif.key);
      if (!m) {
        return total;
      }
      // Exclude maladie non pro which is compute later
      if (m.key === MotifKeys.maladieNonPro) {
        return 0;
      }
      return total + item.durationInMonth * m.value;
    }, 0);

    const seniorityYears = splitBySeniorityYear(dEntree, dSortie);
    const proAbsence = absences
      .filter((absence) => Boolean(absence.durationInMonth))
      .filter((absence) => {
        const m = this.getMotifs().find(
          (motif) => motif.key === absence.motif.key
        );
        return m?.key === MotifKeys.maladieNonPro;
      });
    const absenceProBySeniorityYear = accumulateAbsenceByYear(
      proAbsence,
      seniorityYears
    );
    const totalAbsencePro = absenceProBySeniorityYear.reduce((total, item) => {
      return total + Math.max(item.totalAbsenceInMonth - 1, 0);
    }, 0);

    const totalAbsence = totalAbsenceWithoutProAbsence + totalAbsencePro;
    return {
      value: (differenceInMonths(dSortie, dEntree) - totalAbsence) / 12,
    };
  }
}

const MOTIFS_2941: Motif[] = LEGAL_MOTIFS.map((item) => {
  if (item.key === MotifKeys.maladieNonPro) {
    return {
      ...item,
      startAt: () => true,
      value: 1,
    };
  }
  return item;
});
