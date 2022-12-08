import { differenceInMonths, isBefore, parse } from "date-fns";

import type { LegalSeniorityProps } from "../../base/seniority";
import { LEGAL_MOTIFS } from "../../base/seniority";
import type {
  ISeniority,
  Motif,
  SeniorityProps,
  SeniorityResult,
  SupportedCcIndemniteLicenciement,
  YearDetail,
} from "../../common";
import { accumulateAbsenceByYear } from "../../common";

export type CC0016SeniorityProps = LegalSeniorityProps & {
  isExecutive: boolean;
  becameExecutiveAt?: string;
};

export class Seniority16
  implements ISeniority<SupportedCcIndemniteLicenciement.IDCC0016> {
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
    const totalAbsence = absencePeriods
      .filter((period) => Boolean(period.durationInMonth))
      .reduce((total, item) => {
        const m = this.motifs.find((motif) => motif.key === item.motif.key);
        if (!m || !item.durationInMonth) {
          return total;
        }
        return total + Number(item.durationInMonth) * m.value;
      }, 0);
    if (!isExecutive || !becameExecutiveAt) {
      return {
        value: (differenceInMonths(dSortie, dEntree) - totalAbsence) / 12,
      };
    }
    const becameExecutiveDate = parse(
      becameExecutiveAt,
      "dd/MM/yyyy",
      new Date()
    );
    if (isBefore(becameExecutiveDate, dEntree)) {
      return {
        extraInfos: {
          "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ingénieurs et cadres . ancienneté avant cadre": 0,
        },
        value: (differenceInMonths(dSortie, dEntree) - totalAbsence) / 12,
      };
    }
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
        "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ingénieurs et cadres . ancienneté avant cadre": seniorityBeforeExecutive,
      },
      value: seniorityExecutive,
    };
  }
}

export const MOTIFS_16: Motif[] = LEGAL_MOTIFS.map((item) => ({
  ...item,
  startAt: (data) => {
    return (
      data[
        "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle"
      ] === "'Ingénieurs et cadres'" &&
      data[
        "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ingénieurs et cadres . avant employé ou technicien"
      ] === "'Oui'"
    );
  },
}));
