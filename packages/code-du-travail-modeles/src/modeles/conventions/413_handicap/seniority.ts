import { differenceInMonths, isBefore, parse } from "date-fns";

import type { LegalSeniorityProps } from "../../base/seniority";
import type {
  ISeniority,
  Motif,
  SeniorityProps,
  SeniorityResult,
  SupportedCcIndemniteLicenciement,
  YearDetail,
} from "../../common";
import { accumulateAbsenceByYear } from "../../common";

export type CC0413SeniorityProps = LegalSeniorityProps & {
  isExecutive: boolean;
  becameExecutiveAt?: string;
};

export class Seniority413
  implements ISeniority<SupportedCcIndemniteLicenciement.IDCC413> {
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
  }: SeniorityProps<SupportedCcIndemniteLicenciement.IDCC413>): SeniorityResult {
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
          "contrat salarié . convention collective . établissement handicap . indemnité de licenciement . catégorie professionnelle . non cadre durant une période . temps": 0,
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
        "contrat salarié . convention collective . établissement handicap . indemnité de licenciement . catégorie professionnelle . non cadre durant une période . temps": seniorityBeforeExecutive,
      },
      value: seniorityExecutive,
    };
  }
}
