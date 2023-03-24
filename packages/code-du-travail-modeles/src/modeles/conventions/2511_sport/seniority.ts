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

export class Seniority2511
  implements ISeniority<SupportedCcIndemniteLicenciement.IDCC2511>
{
  computeSeniority({
    dateEntree,
    dateSortie,
    absencePeriods = [],
  }: SeniorityProps<SupportedCcIndemniteLicenciement.IDCC2511>): SeniorityResult {
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
    return MOTIFS_2511;
  }

  private getExtraInfoAbsence(
    absencePeriods: Absence[]
  ): Record<string, string> {
    if (
      absencePeriods.some(
        (absence) => absence.motif.key === MotifKeys.maladieNonPro
      )
    ) {
      return {
        "contrat salarié . convention collective . sport . congé maladie non professionnelle":
          "oui",
      };
    }
    return {};
  }

  private compute(
    from: string,
    to: string,
    absences: Absence[]
  ): SeniorityResult {
    const dEntree = parseDate(from);
    const dSortie = addDays(parseDate(to), 1);

    const totalAbsence =
      absences.reduce((total, item) => {
        const m = this.getMotifs().find(
          (motif) => motif.key === item.motif.key
        );
        if (item.durationInMonth === undefined || !m) {
          return total;
        }
        return total + item.durationInMonth * m.value;
      }, 0) / 12;

    return {
      extraInfos: this.getExtraInfoAbsence(absences),
      value: differenceInMonths(dSortie, dEntree) / 12 - totalAbsence,
    };
  }
}

const MOTIFS_2511: Motif[] = LEGAL_MOTIFS.map((item) => {
  if (
    item.key === MotifKeys.accidentTrajet ||
    item.key === MotifKeys.congesPaternite
  ) {
    return {
      ...item,
      value: 0,
    };
  }
  return item;
});
