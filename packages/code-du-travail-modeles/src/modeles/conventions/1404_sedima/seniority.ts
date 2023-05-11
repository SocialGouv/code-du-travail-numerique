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

export class Seniority1404
  implements ISeniority<SupportedCcIndemniteLicenciement.IDCC1404>
{
  computeSeniority({
    dateEntree,
    dateSortie,
    absencePeriods = [],
  }: SeniorityProps<SupportedCcIndemniteLicenciement.IDCC1404>): SeniorityResult {
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

    const { total: totalAbsence } = absences.reduce(
      ({ total, totalMaladieNonPro }, item) => {
        const m = this.getMotifs().find(
          (motif) => motif.key === item.motif.key
        );
        if (item.durationInMonth === undefined || !m) {
          return { total, totalMaladieNonPro };
        }
        if (item.motif.key === MotifKeys.maladieNonPro) {
          const value = item.motif.value + totalMaladieNonPro;
          if (value > 3) {
            return {
              total: total + value,
              totalMaladieNonPro: value,
            };
          }
          return { total, totalMaladieNonPro: value };
        }
        return {
          total: total + item.durationInMonth * m.value,
          totalMaladieNonPro,
        };
      },
      { total: 0, totalMaladieNonPro: 0 }
    );

    return {
      value: (differenceInMonths(dSortie, dEntree) - totalAbsence) / 12,
    };
  }
}
