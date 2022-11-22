import { differenceInMonths, parse } from "date-fns";

import { LEGAL_MOTIFS } from "../../base/seniority";
import type {
  ISeniority,
  Motif,
  SeniorityProps,
  SeniorityResult,
  SupportedCcIndemniteLicenciement,
} from "../../common";
import { MotifKeys } from "../../common/motif-keys";

export class Seniority44
  implements ISeniority<SupportedCcIndemniteLicenciement.IDCC0044>
{
  protected motifs: Motif[];

  constructor(motifs: Motif[]) {
    this.motifs = motifs;
  }

  computeSeniority({
    dateEntree,
    dateSortie,
    absencePeriods = [],
  }: SeniorityProps<SupportedCcIndemniteLicenciement.IDCC0044>): SeniorityResult {
    const dEntree = parse(dateEntree, "dd/MM/yyyy", new Date());
    const dSortie = parse(dateSortie, "dd/MM/yyyy", new Date());

    const totalAbsence =
      absencePeriods.reduce((total, item) => {
        const m = this.motifs.find((motif) => motif.key === item.motif.key);
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

export const MOTIFS_44: Motif[] = LEGAL_MOTIFS.map((item) => {
  if (item.key === MotifKeys.maladieNonPro) {
    return {
      ...item,
      value: 0,
    };
  }
  return item;
});
