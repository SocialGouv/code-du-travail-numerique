import { differenceInMonths, parse } from "date-fns";

import type {
  ISeniority,
  Motif,
  SeniorityProps,
  SeniorityResult,
  SupportedCcIndemniteLicenciement,
} from "../../common";

export class Seniority1090
  implements ISeniority<SupportedCcIndemniteLicenciement.default> {
  protected motifs: Motif[];

  constructor(motifs: Motif[]) {
    this.motifs = motifs;
  }

  computeSeniority({
    dateEntree,
    dateSortie,
    absencePeriods = [],
  }: SeniorityProps<SupportedCcIndemniteLicenciement.default>): SeniorityResult {
    const dEntree = parse(dateEntree, "dd/MM/yyyy", new Date());
    const dSortie = parse(dateSortie, "dd/MM/yyyy", new Date());
    const totalAbsence =
      absencePeriods
        .filter((period) => Boolean(period.durationInMonth))
        .reduce<number>((total, item) => {
          const m = this.motifs.find((motif) => motif.key === item.motif.key);
          if (!m || !item.durationInMonth) {
            return total;
          }
          if (m.key === "absenceMaladieNonPro") {
            const newValue = Math.max(0, (item.durationInMonth - 6) * m.value);
            return total + newValue;
          }
          return total + item.durationInMonth * m.value;
        }, 0) / 12;
    return {
      value: differenceInMonths(dSortie, dEntree) / 12 - totalAbsence,
    };
  }
}
