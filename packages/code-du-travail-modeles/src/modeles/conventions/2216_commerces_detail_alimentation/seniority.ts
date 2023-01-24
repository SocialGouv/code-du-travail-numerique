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
import { MotifKeys } from "../../common/motif-keys";

export class Seniority2216
  implements ISeniority<SupportedCcIndemniteLicenciement.IDCC2216> {
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
    return MOTIFS_2216;
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
        if (
          item.durationInMonth === undefined ||
          !m ||
          (item.motif.key === MotifKeys.maladieNonPro &&
            item.durationInMonth <= 12) ||
          (item.motif.key === MotifKeys.accidentTrajet &&
            item.durationInMonth <= 12)
        ) {
          return total;
        }
        return total + item.durationInMonth * m.value;
      }, 0) / 12;

    return { value: differenceInMonths(dSortie, dEntree) / 12 - totalAbsence };
  }
}

const MOTIFS_2216: Motif[] = LEGAL_MOTIFS.map((item) => {
  if (item.key === MotifKeys.congesPaternite) {
    return {
      ...item,
      value: 0,
    };
  }
  return item;
});
