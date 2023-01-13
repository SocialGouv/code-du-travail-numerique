import { addDays, differenceInMonths, parse } from "date-fns";

import { LEGAL_MOTIFS } from "../../base";
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
  implements ISeniority<SupportedCcIndemniteLicenciement.IDCC1486> {
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

    const totalAbsence = this.getTotalAbsences(absences);

    return {
      value: (differenceInMonths(dSortie, dEntree) - totalAbsence) / 12,
    };
  }

  private getTotalAbsences(absences: Absence[]) {
    const totalAbsencePerMotif = absences.reduce<Map<string, number>>(
      (total, item) => {
        const m = this.getMotifs().find(
          (motif) => motif.key === item.motif.key
        );
        if (!m || !item.durationInMonth) {
          return total;
        }
        total.set(
          m.key,
          (total.get(m.key) ?? 0) + (item.durationInMonth ?? 0) * m.value
        );
        return total;
      },
      new Map()
    );
    totalAbsencePerMotif.set(
      MotifKeys.maladieNonPro,
      Math.max(0, (totalAbsencePerMotif.get(MotifKeys.maladieNonPro) ?? 0) - 6)
    );
    return Array.from(totalAbsencePerMotif.values()).reduce(
      (sum, value) => sum + value,
      0
    );
  }
}
