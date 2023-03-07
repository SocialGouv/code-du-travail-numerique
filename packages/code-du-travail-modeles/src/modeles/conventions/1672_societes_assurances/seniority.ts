import { differenceInMonths, isBefore, parse } from "date-fns";

import { LEGAL_MOTIFS } from "../../base/seniority";
import type {
  Absence,
  DefaultSeniorityProps,
  ISeniority,
  Motif,
  RequiredSeniorityResult,
  SeniorityProps,
  SeniorityRequiredProps,
  SeniorityResult,
  SupportedCcIndemniteLicenciement,
  YearDetail,
} from "../../common";
import { accumulateAbsenceByYear, MotifKeys } from "../../common";

export type CC1672SeniorityProps = DefaultSeniorityProps & {
  isExecutive: boolean;
  becameExecutiveAt?: string;
};

export class Seniority1672
  implements ISeniority<SupportedCcIndemniteLicenciement.IDCC1672>
{
  computeSeniority({
    dateEntree,
    dateSortie,
    absencePeriods = [],
    isExecutive,
    becameExecutiveAt,
  }: SeniorityProps<SupportedCcIndemniteLicenciement.IDCC0016>): SeniorityResult {
    const dEntree = parse(dateEntree, "dd/MM/yyyy", new Date());
    const dSortie = parse(dateSortie, "dd/MM/yyyy", new Date());

    const totalAbsence = this.removeFirstYearOfCongesParentalEducation(
      absencePeriods
    )
      .filter((period) => Boolean(period.durationInMonth))
      .reduce((total, item) => {
        const m = this.getMotifs().find(
          (motif) => motif.key === item.motif.key
        );
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
          "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle . cadres . ancienneté non cadre": 0,
        },
        value: (differenceInMonths(dSortie, dEntree) - totalAbsence) / 12,
      };
    }
    const periods: YearDetail[] = [
      { begin: dEntree, end: becameExecutiveDate },
      { begin: becameExecutiveDate, end: dSortie },
    ];
    const result = accumulateAbsenceByYear(
      this.removeFirstYearOfCongesParentalEducation(absencePeriods),
      periods
    );
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
        "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle . cadres . ancienneté non cadre":
          seniorityBeforeExecutive,
      },
      value: seniorityExecutive,
    };
  }

  computeRequiredSeniority({
    dateEntree,
    dateNotification,
    absencePeriods = [],
  }: SeniorityRequiredProps): RequiredSeniorityResult {
    const dEntree = parse(dateEntree, "dd/MM/yyyy", new Date());
    const dSortie = parse(dateNotification, "dd/MM/yyyy", new Date());
    const totalAbsence = this.removeFirstYearOfCongesParentalEducation(
      absencePeriods
    )
      .filter((period) => Boolean(period.durationInMonth))
      .reduce((total, item) => {
        const m = this.getMotifs().find(
          (motif) => motif.key === item.motif.key
        );
        if (!m || !item.durationInMonth) {
          return total;
        }
        return total + Number(item.durationInMonth) * m.value;
      }, 0);
    return {
      value: (differenceInMonths(dSortie, dEntree) - totalAbsence) / 12,
    };
  }

  getMotifs(): Motif[] {
    return MOTIFS_1672;
  }

  private removeFirstYearOfCongesParentalEducation(
    absencePeriods: Absence[]
  ): Absence[] {
    return absencePeriods.map((absence) => {
      if (absence.motif.key === MotifKeys.congesParentalEducation) {
        return {
          ...absence,
          durationInMonth: Math.max(0, (absence.durationInMonth ?? 0) - 12),
        };
      }
      return absence;
    });
  }
}

const MOTIFS_1672: Motif[] = LEGAL_MOTIFS.map((item) => ({
  ...item,
  startAt: (data) => {
    return (
      data[
        "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle"
      ] === "'Cadres (Classes 5 à 7)'" &&
      data[
        "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle . cadres . avant non cadres"
      ] === "'Oui'"
    );
  },
}));
