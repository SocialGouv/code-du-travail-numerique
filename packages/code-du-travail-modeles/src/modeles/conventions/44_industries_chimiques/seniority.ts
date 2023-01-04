import { differenceInMonths, parse } from "date-fns";

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
import { MotifKeys } from "../../common/motif-keys";

export class Seniority44
  implements ISeniority<SupportedCcIndemniteLicenciement.IDCC0044> {
  computeSeniority({
    dateEntree,
    dateSortie,
    absencePeriods = [],
  }: SeniorityProps<SupportedCcIndemniteLicenciement.IDCC0044>): SeniorityResult {
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
    return MOTIFS_44;
  }

  private compute(
    from: string,
    to: string,
    absences: Absence[]
  ): SeniorityResult {
    const dEntree = parse(from, "dd/MM/yyyy", new Date());
    const dSortie = parse(to, "dd/MM/yyyy", new Date());

    const totalAbsence =
      absences.reduce((total, item) => {
        const m = this.getMotifs().find(
          (motif) => motif.key === item.motif.key
        );
        if (item.durationInMonth === undefined || !m) {
          return total;
        }
        if (
          item.motif.key === MotifKeys.maladieNonPro &&
          item.durationInMonth > 36
        ) {
          return total + item.durationInMonth;
        }
        return total + item.durationInMonth * m.value;
      }, 0) / 12;

    return { value: differenceInMonths(dSortie, dEntree) / 12 - totalAbsence };
  }
}

const MOTIFS_44: Motif[] = LEGAL_MOTIFS.map((item) => {
  if (item.key === MotifKeys.maladieNonPro) {
    return {
      ...item,
      value: 0,
    };
  }
  return item;
});
