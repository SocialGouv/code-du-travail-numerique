import { differenceInMonths, isBefore, parse } from "date-fns";

import { LEGAL_MOTIFS } from "../../base/seniority";
import type {
  DefaultSeniorityProps,
  Motif,
  RequiredSeniorityResult,
  SeniorityProps,
  SeniorityRequiredProps,
  SeniorityResult,
  SupportedCc,
  YearDetail,
} from "../../common";
import { accumulateAbsenceByYear } from "../../common";
import { SeniorityDefault } from "../../common/seniority";

export type CC0413SeniorityProps = DefaultSeniorityProps & {
  isExecutive?: boolean;
  becameExecutiveAt?: string;
};

export class Seniority413 extends SeniorityDefault<SupportedCc.IDCC413> {
  mapSituation(
    args: Record<string, string | undefined>
  ): SeniorityProps<SupportedCc.IDCC413> {
    const categoriePro =
      args[
        "contrat salarié . convention collective . établissement handicap . indemnité de licenciement . catégorie professionnelle"
      ];
    const becameExecutiveAt =
      args[
        "contrat salarié . convention collective . établissement handicap . indemnité de licenciement . catégorie professionnelle . non cadre durant une période . temps"
      ];
    return {
      ...super.mapSituation(args),
      becameExecutiveAt,
      isExecutive:
        categoriePro === "'Cadres'" ||
        categoriePro ===
          "'Cadres directeurs généraux, directeurs de centre de formation en travail social et directeurs d'établissement ou de service'",
    };
  }

  computeSeniority({
    dateEntree,
    dateSortie,
    absencePeriods = [],
    isExecutive,
    becameExecutiveAt,
  }: SeniorityProps<SupportedCc.IDCC413>): SeniorityResult {
    const dEntree = parse(dateEntree, "dd/MM/yyyy", new Date());
    const dSortie = parse(dateSortie, "dd/MM/yyyy", new Date());
    const totalAbsence = absencePeriods
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
          "contrat salarié . convention collective . établissement handicap . indemnité de licenciement . catégorie professionnelle . non cadre durant une période . temps effectif": 0,
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

    const seniorityBeforeExecutive =
      (differenceInMonths(becameExecutiveDate, dEntree) -
        totalAbsenceBeforeExecutive) /
      12;
    return {
      extraInfos: {
        "contrat salarié . convention collective . établissement handicap . indemnité de licenciement . catégorie professionnelle . non cadre durant une période . temps effectif":
          seniorityBeforeExecutive,
      },
      value: (differenceInMonths(dSortie, dEntree) - totalAbsence) / 12,
    };
  }

  computeRequiredSeniority({
    dateEntree,
    dateNotification,
    absencePeriods = [],
  }: SeniorityRequiredProps<SupportedCc.default>): RequiredSeniorityResult {
    const dEntree = parse(dateEntree, "dd/MM/yyyy", new Date());
    const dSortie = parse(dateNotification, "dd/MM/yyyy", new Date());
    const totalAbsence = absencePeriods
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
    return MOTIFS_413;
  }
}

const MOTIFS_413: Motif[] = LEGAL_MOTIFS.map((item) => ({
  ...item,
  startAt: (data) => {
    return (
      (data[
        "contrat salarié . convention collective . établissement handicap . indemnité de licenciement . catégorie professionnelle"
      ] === "'Cadres'" ||
        data[
          "contrat salarié . convention collective . établissement handicap . indemnité de licenciement . catégorie professionnelle"
        ] ===
          "'Cadres directeurs généraux, directeurs de centre de formation en travail social et directeurs d'établissement ou de service'") &&
      data[
        "contrat salarié . convention collective . établissement handicap . indemnité de licenciement . catégorie professionnelle . non cadre durant une période"
      ] === "'Oui'"
    );
  },
}));
