import {
  addDays,
  differenceInMonths,
  isBefore,
  isEqual,
  parse,
} from "date-fns";

import { LEGAL_MOTIFS } from "../../base/seniority";
import type {
  Absence,
  DefaultSeniorityProps,
  DefaultSeniorityRequiredProps,
  Motif,
  RequiredSeniorityResult,
  SeniorityProps,
  SeniorityRequiredProps,
  SeniorityResult,
  SupportedCcIndemniteLicenciement,
  YearDetail,
} from "../../common";
import { accumulateAbsenceByYear, MotifKeys, parseDate } from "../../common";
import { SeniorityDefault } from "../../common/seniority";

export type CC3248SeniorityProps = DefaultSeniorityProps & {
  categoriePro: "'A, B, C, D ou E'" | "'F, G, H ou I'";
  hasBeenDayContract: boolean;
  hasBeenExecutive: boolean;
  dateBecomeDayContract?: string;
};

export type CC3248SeniorityRequiredProps = DefaultSeniorityRequiredProps & {
  categoriePro: "'A, B, C, D ou E'" | "'F, G, H ou I'";
  hasBeenDayContract: boolean;
  hasBeenExecutive: boolean;
  dateBecomeDayContract?: string;
};

export class Seniority3248 extends SeniorityDefault<SupportedCcIndemniteLicenciement.IDCC3248> {
  mapSituation(
    args: Record<string, string | undefined>
  ): SeniorityProps<SupportedCcIndemniteLicenciement.IDCC3248> {
    return this.map(args);
  }

  mapRequiredSituation(
    args: Record<string, string | undefined>
  ): SeniorityRequiredProps<SupportedCcIndemniteLicenciement.IDCC3248> {
    return this.map(args);
  }

  getMotifs(): Motif[] {
    return MOTIFS_3248;
  }

  computeSeniority({
    dateEntree,
    dateSortie,
    absencePeriods = [],
    categoriePro,
    hasBeenDayContract,
    dateBecomeDayContract,
    hasBeenExecutive,
  }: SeniorityProps<SupportedCcIndemniteLicenciement.IDCC3248>): SeniorityResult {
    switch (categoriePro) {
      case "'A, B, C, D ou E'":
        return this.computeABCDE(
          dateEntree,
          dateSortie,
          absencePeriods,
          hasBeenExecutive,
          hasBeenDayContract,
          dateBecomeDayContract
        );
      case "'F, G, H ou I'":
        return this.computeFGHI(dateEntree, dateSortie);
    }
  }

  computeRequiredSeniority({
    dateEntree,
    dateNotification,
    absencePeriods = [],
    categoriePro,
    hasBeenExecutive,
    hasBeenDayContract,
    dateBecomeDayContract,
  }: SeniorityRequiredProps<SupportedCcIndemniteLicenciement.IDCC3248>): RequiredSeniorityResult {
    switch (categoriePro) {
      case "'A, B, C, D ou E'":
        return this.computeABCDE(
          dateEntree,
          dateNotification,
          absencePeriods,
          hasBeenExecutive,
          hasBeenDayContract,
          dateBecomeDayContract
        );
      case "'F, G, H ou I'":
        return this.computeFGHI(dateEntree, dateNotification);
    }
  }

  protected computeFGHI(from: string, to: string): SeniorityResult {
    const dEntree = parseDate(from);
    const dSortie = addDays(parseDate(to), 1);
    return {
      value: differenceInMonths(dSortie, dEntree) / 12,
    };
  }

  protected computeABCDE(
    from: string,
    to: string,
    absences: Absence[],
    hasBeenExecutive: boolean,
    hasBeenDayContract: boolean,
    dateBecomeDayContract: string | undefined
  ): SeniorityResult {
    const dEntree = parseDate(from);
    const dSortie = addDays(parseDate(to), 1);
    const absencesWithExcludedAbsences = !hasBeenExecutive
      ? absences.filter(
          (absence) => absence.durationInMonth && absence.durationInMonth > 12
        )
      : [];
    const increase = this.calculateDayContractIncrease(
      dEntree,
      dSortie,
      absencesWithExcludedAbsences,
      hasBeenDayContract,
      hasBeenExecutive,
      dateBecomeDayContract
    );

    const totalAbsence = absencesWithExcludedAbsences.reduce((total, item) => {
      if (item.durationInMonth) {
        return total + item.durationInMonth;
      }
      return total;
    }, 0);
    const hasLongAbsence = absencesWithExcludedAbsences.some(
      (item) =>
        item.durationInMonth &&
        item.durationInMonth > 12 &&
        [
          MotifKeys.congesCreationEntreprise,
          MotifKeys.congesSabbatique,
          MotifKeys.congesSansSolde,
        ].includes(item.motif.key)
    );

    return {
      extraInfos: {
        "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . congés plus de 12 mois":
          hasLongAbsence ? "oui" : "non",
      },
      value:
        (differenceInMonths(dSortie, dEntree) - totalAbsence + increase) / 12,
    };
  }

  private map(
    args: Record<string, string | undefined>
  ): SeniorityRequiredProps<SupportedCcIndemniteLicenciement.IDCC3248> {
    const categoriePro = args[
      "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle"
    ] as "'A, B, C, D ou E'" | "'F, G, H ou I'";
    const hasBeenExecutive =
      args[
        "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . avant cadre"
      ];
    const hasBeenDayContract =
      args[
        "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . forfait jour"
      ];
    const hasAllwaysBeenDayContract =
      args[
        "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . toujours au forfait jour"
      ];

    const dateBeginDayContract =
      hasAllwaysBeenDayContract === "'Non'"
        ? args[
            "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . forfait jour . date"
          ]
        : undefined;
    return {
      ...super.mapRequiredSituation(args),
      categoriePro,
      dateBecomeDayContract: dateBeginDayContract,
      hasBeenDayContract: hasBeenDayContract === "'Oui'",
      hasBeenExecutive: hasBeenExecutive === "'Oui'",
    } as SeniorityRequiredProps<SupportedCcIndemniteLicenciement.IDCC3248>;
  }

  private calculateDayContractIncrease(
    dEntree: Date,
    dSortie: Date,
    absences: Absence[],
    hasBeenDayContract: boolean,
    hasBeenExecutive: boolean,
    dateBecomeDayContract: string | undefined
  ): number {
    if (!hasBeenDayContract) {
      return 0;
    }
    const dStartMajoration = this.computeDateStartForDayContractIncrease(
      dEntree,
      hasBeenExecutive,
      dateBecomeDayContract
    );
    const periods: YearDetail[] = [{ begin: dStartMajoration, end: dSortie }];
    let totalAbsenceAfterDayContract = 0;
    if (isEqual(dStartMajoration, dEntree)) {
      totalAbsenceAfterDayContract = absences.reduce((total, item) => {
        if (item.durationInMonth) {
          return total + item.durationInMonth;
        }
        return total;
      }, 0);
    } else {
      const result = accumulateAbsenceByYear(absences, periods);
      totalAbsenceAfterDayContract = result[0].totalAbsenceInMonth;
    }

    const seniorityAfterDayContract = differenceInMonths(
      dSortie,
      dStartMajoration
    );
    return (seniorityAfterDayContract - totalAbsenceAfterDayContract) * 0.5;
  }

  private computeDateStartForDayContractIncrease(
    dStart: Date,
    hasBeenExecutive: boolean,
    dateBecomeDayContract: string | undefined
  ): Date {
    const dBecomeDayContract = dateBecomeDayContract
      ? parse(dateBecomeDayContract, "dd/MM/yyyy", new Date())
      : undefined;

    if (!hasBeenExecutive) {
      return dBecomeDayContract ?? dStart;
    }

    const dStart3248 = parse("01/01/2024", "dd/MM/yyyy", new Date());
    if (!dBecomeDayContract) {
      return dStart3248;
    }

    return isBefore(dBecomeDayContract, dStart3248)
      ? dStart3248
      : dBecomeDayContract;
  }
}

const MOTIFS_3248: Motif[] = LEGAL_MOTIFS.map((item) => ({
  ...item,
  startAt: (data) => {
    return (
      data[
        "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . forfait jour . date"
      ] !== undefined
    );
  },
}));
