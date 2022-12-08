import { differenceInMonths, parse } from "date-fns";

import { LEGAL_MOTIFS } from "../../base/seniority";
import type {
  ISeniority,
  Motif,
  SeniorityProps,
  SeniorityResult,
  SupportedCcIndemniteLicenciement,
} from "../../common";
import { accumulateAbsenceByYear, splitBySeniorityYear } from "../../common";
import { MotifKeys } from "../../common/motif-keys";

export class Seniority2941
  implements ISeniority<SupportedCcIndemniteLicenciement.IDCC2941> {
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

    const totalAbsenceWithoutProAbsence = absencePeriods.reduce(
      (total, item) => {
        if (item.durationInMonth === undefined) {
          return 0;
        }
        const m = this.motifs.find((motif) => motif.key === item.motif.key);
        if (!m) {
          return total;
        }
        // Exclude maladie non pro which is compute later
        if (m.key === MotifKeys.maladieNonPro) {
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
        const m = this.motifs.find((motif) => motif.key === absence.motif.key);
        return m?.key === MotifKeys.maladieNonPro;
      });
    const absenceProBySeniorityYear = accumulateAbsenceByYear(
      proAbsence,
      seniorityYears
    );
    const totalAbsencePro = absenceProBySeniorityYear.reduce((total, item) => {
      return total + Math.max(item.totalAbsenceInMonth - 1, 0);
    }, 0);

    const totalAbsence = totalAbsenceWithoutProAbsence + totalAbsencePro;
    return {
      value: (differenceInMonths(dSortie, dEntree) - totalAbsence) / 12,
    };
  }
}

export const MOTIFS_2941: Motif[] = LEGAL_MOTIFS.map((item) => {
  if (item.key === MotifKeys.maladieNonPro) {
    return {
      ...item,
      startAt: () => true,
      value: 1,
    };
  }
  return item;
});
