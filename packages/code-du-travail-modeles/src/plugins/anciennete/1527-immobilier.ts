import { differenceInMonths, parse } from "date-fns";

import type { SupportedCcIndemniteLicenciement } from "..";
import { LEGAL_MOTIFS } from "./legal";
import { MotifKeys } from "./motif-keys";
import type { ISeniority, Motif, SeniorityProps } from "./types";
import { accumulateAbsenceByYear, splitByTwelveMonthsRolling } from "./utils";

export class SenioritY1527
  implements ISeniority<SupportedCcIndemniteLicenciement.IDCC1527>
{
  protected motifs: Motif[];

  constructor(motifs: Motif[]) {
    this.motifs = motifs;
  }

  computeSeniority({
    dateEntree,
    dateSortie,
    absencePeriods = [],
  }: SeniorityProps<SupportedCcIndemniteLicenciement.IDCC1527>): number {
    const dEntree = parse(dateEntree, "dd/MM/yyyy", new Date());
    const dSortie = parse(dateSortie, "dd/MM/yyyy", new Date());

    const totalAbsenceWithoutCongesSansSoldesAbsence = absencePeriods.reduce(
      (total, item) => {
        if (item.durationInMonth === undefined) {
          return 0;
        }
        const m = this.motifs.find((motif) => motif.key === item.motif.key);
        if (!m) {
          return total;
        }
        // Exclude congés sans solde which is compute later
        if (m.key === MotifKeys.congesSansSolde) {
          return 0;
        }
        return total + item.durationInMonth * m.value;
      },
      0
    );

    const congesSansSoldeAbsences = absencePeriods.filter(
      (absence) =>
        Boolean(absence.durationInMonth) &&
        absence.motif.key === "absenceCongesSansSolde"
    );
    const years = splitByTwelveMonthsRolling(congesSansSoldeAbsences);

    const congesSansSoldesAbsencesBySeniorityYear = accumulateAbsenceByYear(
      congesSansSoldeAbsences,
      years
    );
    const totalCongesSansSoldesAbsence =
      congesSansSoldesAbsencesBySeniorityYear.reduce(
        (total, item) =>
          item.totalAbsenceInMonth >= 1
            ? total + item.totalAbsenceInMonth
            : total,
        0
      );

    const totalAbsence =
      totalAbsenceWithoutCongesSansSoldesAbsence + totalCongesSansSoldesAbsence;
    return (differenceInMonths(dSortie, dEntree) - totalAbsence) / 12;
  }
}

export const MOTIFS_1527: Motif[] = LEGAL_MOTIFS.map((item) => {
  if (item.key === MotifKeys.congesSansSolde) {
    return {
      ...item,
      startAt: true,
      value: 1,
    };
  }
  return item;
});
