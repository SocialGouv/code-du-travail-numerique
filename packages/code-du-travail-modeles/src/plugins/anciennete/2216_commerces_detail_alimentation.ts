import { differenceInMonths, parse } from "date-fns";

import type { SupportedCcIndemniteLicenciement } from "..";
import { LEGAL_MOTIFS } from "./legal";
import { MotifKeys } from "./motif-keys";
import type { ISeniority, Motif, SeniorityProps } from "./types";

export class Seniority2216
  implements ISeniority<SupportedCcIndemniteLicenciement.IDCC2216>
{
  protected motifs: Motif[];

  constructor(motifs: Motif[]) {
    this.motifs = motifs;
  }

  computeSeniority({
    dateEntree,
    dateSortie,
    absencePeriods = [],
  }: SeniorityProps<SupportedCcIndemniteLicenciement.IDCC2216>): number {
    const dEntree = parse(dateEntree, "dd/MM/yyyy", new Date());
    const dSortie = parse(dateSortie, "dd/MM/yyyy", new Date());

    const totalAbsence =
      absencePeriods.reduce((total, item) => {
        const m = this.motifs.find((motif) => motif.key === item.motif.key);
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

    return differenceInMonths(dSortie, dEntree) / 12 - totalAbsence;
  }
}

export const MOTIFS_2216: Motif[] = LEGAL_MOTIFS.map((item) => {
  if (item.key === MotifKeys.congesPaternite) {
    return {
      ...item,
      value: 0,
    };
  }
  return item;
});
