import { addDays, differenceInMonths } from "date-fns";

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
import { parseDate } from "../../common";
import { MotifKeys } from "../../common/motif-keys";
import { SeniorityDefault } from "../../common/seniority";

export class Seniority44 extends SeniorityDefault<SupportedCc.IDCC0044> {
  computeSeniority({
    dateEntree,
    dateSortie,
    absencePeriods = [],
  }: SeniorityProps<SupportedCc.IDCC0044>): SeniorityResult {
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
    return MOTIFS_44;
  }

  protected compute(
    from: string,
    to: string,
    absences: Absence[]
  ): SeniorityResult {
    const dEntree = parseDate(from);
    const dSortie = addDays(parseDate(to), 1);

    const totalAbsence = absences.reduce((total, item) => {
      const m = this.getMotifs().find((motif) => motif.key === item.motif.key);
      if (item.durationInMonth === undefined || !m) {
        return total;
      }
      if (
        item.motif.key === MotifKeys.maladieNonPro &&
        item.durationInMonth > 36
      ) {
        return total + (item.durationInMonth - 36);
      }
      return total + item.durationInMonth * m.value;
    }, 0);

    return {
      value: (differenceInMonths(dSortie, dEntree) - totalAbsence) / 12,
    };
  }
}

const MOTIFS_44: Motif[] = LEGAL_MOTIFS.map((item) => {
  if (
    item.key === MotifKeys.maladieNonPro ||
    item.key === MotifKeys.accidentTrajet
  ) {
    return {
      ...item,
      value: 0,
    };
  }
  return item;
});
