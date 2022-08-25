import { differenceInMonths, parse } from "date-fns";

import type { SupportedCcIndemniteLicenciement } from "..";
import type { ISeniority, Motif, SeniorityProps } from "./types";
import { accumulateAbsenceByYear, splitBySeniorityYear } from "./utils";

export class Seniority2941
  implements ISeniority<SupportedCcIndemniteLicenciement.IDCC2941>
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

    const totalAbsenceWithoutProAbsence = absencePeriods.reduce(
      (total, item) => {
        if (item.durationInMonth === undefined) {
          return 0;
        }
        const m = this.motifs.find((motif) => motif.label === item.motif);
        if (!m) {
          return total;
        }
        // Exclude maladie non pro which is compute later
        if (m.key === "absenceMaladieNonPro") {
          return 0;
        }
        return total + item.durationInMonth * m.value;
      },
      0
    );

    const seniorityYears = splitBySeniorityYear(dEntree, dSortie);
    const proAbsence = absencePeriods
      .filter((absence) => Boolean(absence.durationInMonth))
      .filter((absence) => {
        const m = this.motifs.find((motif) => motif.label === absence.motif);
        return m?.key === "absenceMaladieNonPro";
      });
    const absenceProBySeniorityYear = accumulateAbsenceByYear(
      proAbsence,
      seniorityYears
    );
    const totalAbsencePro = absenceProBySeniorityYear.reduce((total, item) => {
      return total + Math.max(item.totalAbsenceInMonth - 1, 0);
    }, 0);

    const totalAbsence = (totalAbsenceWithoutProAbsence + totalAbsencePro) / 12;
    return differenceInMonths(dSortie, dEntree) / 12 - totalAbsence;
  }
}
