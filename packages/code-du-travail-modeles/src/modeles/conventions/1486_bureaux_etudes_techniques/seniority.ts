import { addDays, differenceInMonths, parse } from "date-fns";

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
import { MotifKeys } from "../../common";

export class Seniority1486
  implements ISeniority<SupportedCcIndemniteLicenciement.IDCC1486>
{
  computeSeniority({
    dateEntree,
    dateSortie,
    absencePeriods = [],
  }: SeniorityProps<SupportedCcIndemniteLicenciement.IDCC1486>): SeniorityResult {
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
    const dEntree = parse(from, "dd/MM/yyyy", new Date());
    const dSortie = addDays(parse(to, "dd/MM/yyyy", new Date()), 1);

    const totalAbsence =
      absences.reduce((total, item) => {
        const m = this.getMotifs().find(
          (motif) => motif.key === item.motif.key
        );
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
      }, 0) / 12;

    return {
      value: differenceInMonths(dSortie, dEntree) / 12 - totalAbsence,
    };
  }
}
