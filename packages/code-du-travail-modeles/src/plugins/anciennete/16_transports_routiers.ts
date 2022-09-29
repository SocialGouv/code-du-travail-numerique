import { differenceInMonths, parse } from "date-fns";

import type { SeniorityResult, SupportedCcIndemniteLicenciement } from "..";
import type { LegalSeniorityProps } from "./legal";
import { LEGAL_MOTIFS } from "./legal";
import type { ISeniority, Motif, SeniorityProps } from "./types";
import type { YearDetail } from "./utils";
import { accumulateAbsenceByYear } from "./utils";

export type CC0016SeniorityProps = LegalSeniorityProps & {
  isExecutive: boolean;
  becameExecutiveAt?: string;
};

export class Seniority16
  implements ISeniority<SupportedCcIndemniteLicenciement.IDCC0016>
{
  protected motifs: Motif[];

  constructor(motifs: Motif[]) {
    this.motifs = motifs;
  }

  computeSeniority({
    dateEntree,
    dateSortie,
    absencePeriods = [],
    isExecutive,
    becameExecutiveAt,
  }: SeniorityProps<SupportedCcIndemniteLicenciement.IDCC0016>): SeniorityResult {
    const dEntree = parse(dateEntree, "dd/MM/yyyy", new Date());
    const dSortie = parse(dateSortie, "dd/MM/yyyy", new Date());
    if (!isExecutive || !becameExecutiveAt) {
      const totalAbsence = absencePeriods
        .filter((period) => Boolean(period.durationInMonth))
        .reduce((total, item) => {
          const m = this.motifs.find((motif) => motif.key === item.motif.key);
          if (!m || !item.durationInMonth) {
            return total;
          }
          return total + Number(item.durationInMonth) * m.value;
        }, 0);
      return {
        value: (differenceInMonths(dSortie, dEntree) - totalAbsence) / 12,
      };
    }
    const becameExecutiveDate = parse(
      becameExecutiveAt,
      "dd/MM/yyyy",
      new Date()
    );
    const periods: YearDetail[] = [
      { begin: dEntree, end: becameExecutiveDate },
      { begin: becameExecutiveDate, end: dSortie },
    ];
    const result = accumulateAbsenceByYear(absencePeriods, periods);
    const totalAbsenceBeforeExecutive = result[0].totalAbsenceInMonth;
    const totalAbsenceExecutive = result[1].totalAbsenceInMonth;

    const seniorityExecutive =
      (differenceInMonths(dSortie, becameExecutiveDate) -
        totalAbsenceExecutive) /
      12;
    const seniorityBeforeExecutive =
      (differenceInMonths(becameExecutiveDate, dEntree) -
        totalAbsenceBeforeExecutive) /
      12;
    return {
      extraInfos: {
        "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ingénieurs et cadres . ancienneté avant cadre":
          seniorityBeforeExecutive,
      },
      value: seniorityExecutive,
    };
  }
}

export const MOTIFS_16: Motif[] = LEGAL_MOTIFS.map((item) => ({
  ...item,
  startAt: true,
}));
