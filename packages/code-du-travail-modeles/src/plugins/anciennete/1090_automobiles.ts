import { differenceInMonths, parse } from "date-fns";

import type { SupportedCcIndemniteLicenciement } from "..";
import type { ISeniority, Motif, SeniorityProps } from "./types";

export class Seniority1090
  implements ISeniority<SupportedCcIndemniteLicenciement.default>
{
  protected motifs: Motif[];

  constructor(motifs: Motif[]) {
    this.motifs = motifs;
  }

  computeSeniority({
    dateEntree,
    dateSortie,
    absencePeriods = [],
  }: SeniorityProps<SupportedCcIndemniteLicenciement.default>): number {
    const dEntree = parse(dateEntree, "dd/MM/yyyy", new Date());
    const dSortie = parse(dateSortie, "dd/MM/yyyy", new Date());
    const totalAbsence =
      absencePeriods
        .filter((period) => Boolean(period.durationInMonth))
        .reduce((total, item) => {
          const m = this.motifs.find((motif) => motif.label === item.motif);
          if (!m || !item.durationInMonth) {
            return total;
          }
          if (m.key === "absenceMaladieNonPro") {
            const newValue = Math.max(0, (item.durationInMonth - 6) * m.value);
            return total + newValue;
          }
          return total + item.durationInMonth * m.value;
        }, 0) / 12;
    return differenceInMonths(dSortie, dEntree) / 12 - totalAbsence;
  }
}
