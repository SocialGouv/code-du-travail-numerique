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
  splitByTwelveMonthsRolling,
} from "../../common";
import { MotifKeys } from "../../common/motif-keys";

export class Seniority1527
  implements ISeniority<SupportedCcIndemniteLicenciement.IDCC1527>
{
  computeSeniority({
    dateEntree,
    dateSortie,
    absencePeriods = [],
  }: SeniorityProps<SupportedCcIndemniteLicenciement.IDCC1527>): SeniorityResult {
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
    return MOTIFS_1527;
  }

  private compute(
    from: string,
    to: string,
    absences: Absence[]
  ): SeniorityResult {
    const dEntree = parseDate(from);
    const dSortie = addDays(parseDate(to), 1);

    const totalAbsenceWithoutCongesSansSoldesAbsence = absences.reduce(
      (total, item) => {
        if (item.durationInMonth === undefined) {
          return 0;
        }
        const m = this.getMotifs().find(
          (motif) => motif.key === item.motif.key
        );
        if (!m) {
          return total;
        }
        // Exclude congés sans solde which is compute later
        if (m.key === MotifKeys.congesSansSolde) {
          return 0;
        }
        return total + item.durationInMonth * m.value;
      },
      0
    );

    const congesSansSoldeAbsences = absences.filter(
      (absence) =>
        Boolean(absence.durationInMonth) &&
        absence.motif.key === "absenceCongesSansSolde"
    );
    const years = splitByTwelveMonthsRolling(congesSansSoldeAbsences);

    const congesSansSoldesAbsencesBySeniorityYear = accumulateAbsenceByYear(
      congesSansSoldeAbsences,
      years
    );
    const totalCongesSansSoldesAbsence =
      congesSansSoldesAbsencesBySeniorityYear.reduce(
        (total, item) =>
          item.totalAbsenceInMonth >= 1
            ? total + item.totalAbsenceInMonth
            : total,
        0
      );

    const totalAbsence =
      totalAbsenceWithoutCongesSansSoldesAbsence + totalCongesSansSoldesAbsence;
    return {
      value: (differenceInMonths(dSortie, dEntree) - totalAbsence) / 12,
    };
  }
}

const MOTIFS_1527: Motif[] = LEGAL_MOTIFS.map((item) => {
  if (item.key === MotifKeys.congesSansSolde) {
    return {
      ...item,
      startAt: () => true,
      value: 1,
    };
  }
  return item;
});
