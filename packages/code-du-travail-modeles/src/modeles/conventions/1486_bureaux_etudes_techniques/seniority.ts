import { addDays, differenceInMonths, isBefore } from "date-fns";

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
import { MotifKeys, parseDate } from "../../common";
import { SeniorityDefault } from "../../common/seniority";

export class Seniority1486 extends SeniorityDefault<SupportedCc.IDCC1486> {
  computeSeniority({
    dateEntree,
    dateSortie,
    absencePeriods = [],
  }: SeniorityProps<SupportedCc.IDCC1486>): SeniorityResult {
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
    return LEGAL_MOTIFS;
  }

  protected compute(
    from: string,
    to: string,
    absences: Absence[]
  ): SeniorityResult {
    const dEntree = parseDate(from);
    const dSortie = addDays(parseDate(to), 1);
    const oldArticle = isBefore(parseDate(to), parseDate("01/05/2023"));

    const totalAbsence = absences.reduce((total, item) => {
      const m = this.getMotifs().find((motif) => motif.key === item.motif.key);
      if (item.durationInMonth === undefined || !m) {
        return total;
      }
      if (
        item.motif.key === MotifKeys.maladieNonPro ||
        item.motif.key === MotifKeys.accidentTrajet
      ) {
        return total + Math.max(item.durationInMonth - 6, 0);
      }
      return total + item.durationInMonth * m.value;
    }, 0);

    return {
      extraInfos: {
        "contrat salarié . convention collective . bureaux études techniques . indemnité de licenciement . utilisation des anciennes règles de calcul":
          oldArticle ? "oui" : "non",
      },
      value: (differenceInMonths(dSortie, dEntree) - totalAbsence) / 12,
    };
  }
}
