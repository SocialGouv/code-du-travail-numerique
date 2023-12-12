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
import { parseDate } from "../../common";
import { MotifKeys } from "../../common/motif-keys";

export class Seniority2216
  implements ISeniority<SupportedCcIndemniteLicenciement.IDCC2216>
{
  computeSeniority({
    dateEntree,
    dateSortie,
    absencePeriods = [],
  }: SeniorityProps<SupportedCcIndemniteLicenciement.IDCC2216>): SeniorityResult {
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
    return LEGAL_MOTIFS;
  }

  private compute(
    from: string,
    to: string,
    absences: Absence[]
  ): SeniorityResult {
    const dEntree = parseDate(from);
    const dSortie = addDays(parseDate(to), 1);

    const totalAbsenceWithoutNonProEtAccidentTrajet = absences.reduce(
      (total, item) => {
        const m = this.getMotifs().find(
          (motif) => motif.key === item.motif.key
        );
        if (
          item.durationInMonth === undefined ||
          !m ||
          item.motif.key === MotifKeys.maladieNonPro ||
          item.motif.key === MotifKeys.accidentTrajet
        ) {
          return total;
        }
        return total + item.durationInMonth * m.value;
      },
      0
    );

    const absencesMaladieNonPro = absences.filter(
      (m) => m.motif.key === MotifKeys.maladieNonPro
    );

    const totalMonthAbsenceMaladieNonPro = absencesMaladieNonPro.reduce(
      (total, item) => {
        if (item.durationInMonth === undefined) {
          return total;
        }
        return total + item.durationInMonth;
      },
      0
    );

    const absenceNonPro = Math.max(totalMonthAbsenceMaladieNonPro - 12, 0);

    let maladieNonProMotifValue = 0;
    const maladieNonProMotif = this.getMotifs().find(
      (m) => m.key === MotifKeys.maladieNonPro
    );
    if (maladieNonProMotif) {
      maladieNonProMotifValue = maladieNonProMotif.value;
    }

    const absencesTrajet = absences.filter(
      (m) => m.motif.key === MotifKeys.accidentTrajet
    );

    const totalMonthAbsenceTrajet = absencesTrajet.reduce((total, item) => {
      if (item.durationInMonth === undefined) {
        return total;
      }
      return total + item.durationInMonth;
    }, 0);

    const absenceTrajet = Math.max(totalMonthAbsenceTrajet - 12, 0);

    let trajetMotifValue = 0;
    const trajetProMotif = this.getMotifs().find(
      (m) => m.key === MotifKeys.maladieNonPro
    );
    if (trajetProMotif) {
      trajetMotifValue = trajetProMotif.value;
    }

    const totalAbsence =
      absenceNonPro * maladieNonProMotifValue +
      absenceTrajet * trajetMotifValue +
      totalAbsenceWithoutNonProEtAccidentTrajet;

    return {
      value: (differenceInMonths(dSortie, dEntree) - totalAbsence) / 12,
    };
  }
}
