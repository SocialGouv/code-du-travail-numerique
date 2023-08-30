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

    const totalAbsence = absences.reduce((total, item) => {
      const m = this.getMotifs().find((motif) => motif.key === item.motif.key);
      if (
        item.durationInMonth === undefined ||
        !m ||
        (item.motif.key === MotifKeys.maladieNonPro &&
          item.durationInMonth <= 12) ||
        (item.motif.key === MotifKeys.accidentTrajet &&
          item.durationInMonth <= 12)
      ) {
        return total;
      } else if (
        (item.motif.key === MotifKeys.maladieNonPro &&
          item.durationInMonth > 12) ||
        (item.motif.key === MotifKeys.accidentTrajet &&
          item.durationInMonth > 12)
      ) {
        return total + (item.durationInMonth - 12) * m.value;
      }
      return total + item.durationInMonth * m.value;
    }, 0);

    return {
      value: (differenceInMonths(dSortie, dEntree) - totalAbsence) / 12,
    };
  }
}
