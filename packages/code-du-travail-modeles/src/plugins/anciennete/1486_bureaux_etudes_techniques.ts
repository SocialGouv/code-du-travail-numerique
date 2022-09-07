import { differenceInMonths, parse } from "date-fns";

import type { SupportedCcIndemniteLicenciement } from "..";
import { MotifKeys } from "./motif-keys";
import type { ISeniority, Motif, SeniorityProps } from "./types";

export class Seniority1486
  implements ISeniority<SupportedCcIndemniteLicenciement.IDCC1486>
{
  protected motifs: Motif[];

  constructor(motifs: Motif[]) {
    this.motifs = motifs;
  }

  computeSeniority({
    dateEntree,
    dateSortie,
    absencePeriods = [],
  }: SeniorityProps<SupportedCcIndemniteLicenciement.IDCC1486>): number {
    const dEntree = parse(dateEntree, "dd/MM/yyyy", new Date());
    const dSortie = parse(dateSortie, "dd/MM/yyyy", new Date());

    const totalAbsence =
      absencePeriods.reduce((total, item) => {
        const m = this.motifs.find((motif) => motif.key === item.motif.key);
        if (
          item.durationInMonth === undefined ||
          !m ||
          (item.motif.key === MotifKeys.maladieNonPro &&
            item.durationInMonth < 6)
        ) {
          return total;
        }
        return total + item.durationInMonth * m.value;
      }, 0) / 12;

    return differenceInMonths(dSortie, dEntree) / 12 - totalAbsence;
  }
}
