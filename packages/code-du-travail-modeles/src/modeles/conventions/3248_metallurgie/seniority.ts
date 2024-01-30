import { addDays, differenceInMonths, parse } from "date-fns";

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
    const categoriePro = args[
      "contrat salarié - convention collective - métallurgie - indemnité de licenciement - catégorie professionnelle"
    ] as "'A, B, C, D ou E'" | "'F, G, H ou I'";
    const hasBeenExecutive =
      args[
        "contrat salarié - convention collective - métallurgie - indemnité de licenciement - catégorie professionnelle - ABCDE - avant cadre"
      ];
    const hasBeenDayContract =
      args[
        "contrat salarié - convention collective - métallurgie - indemnité de licenciement - catégorie professionnelle - ABCDE - forfait jour"
      ];
    const hasAllwaysBeenDayContract =
      args[
        "contrat salarié - convention collective - métallurgie - indemnité de licenciement - catégorie professionnelle - ABCDE - toujours au forfait jour"
      ];

    const dateBeginDayContract =
      hasAllwaysBeenDayContract === "'Non'"
        ? args[
            "contrat salarié - convention collective - métallurgie - indemnité de licenciement - catégorie professionnelle - ABCDE - forfait jour - date"
          ]
        : undefined;
    return {
      ...super.mapSituation(args),
      categoriePro,
      dateBecomeDayContract: dateBeginDayContract,
      hasBeenDayContract: hasBeenDayContract === "'Oui'",
      hasBeenExecutive: hasBeenExecutive === "'Oui'",
    } as SeniorityProps<SupportedCcIndemniteLicenciement.IDCC3248>;
  }

  mapRequiredSituation(
    args: Record<string, string | undefined>
  ): SeniorityRequiredProps<SupportedCcIndemniteLicenciement.IDCC3248> {
    const categoriePro = args[
      "contrat salarié - convention collective - métallurgie - indemnité de licenciement - catégorie professionnelle"
    ] as "'A, B, C, D ou E'" | "'F, G, H ou I'";
    const hasBeenExecutive =
      args[
        "contrat salarié - convention collective - métallurgie - indemnité de licenciement - catégorie professionnelle - ABCDE - avant cadre"
      ];
    const hasBeenDayContract =
      args[
        "contrat salarié - convention collective - métallurgie - indemnité de licenciement - catégorie professionnelle - ABCDE - forfait jour"
      ];
    const hasAllwaysBeenDayContract =
      args[
        "contrat salarié - convention collective - métallurgie - indemnité de licenciement - catégorie professionnelle - ABCDE - toujours au forfait jour"
      ];

    const dateBeginDayContract =
      hasAllwaysBeenDayContract === "'Non'"
        ? args[
            "contrat salarié - convention collective - métallurgie - indemnité de licenciement - catégorie professionnelle - ABCDE - forfait jour - date"
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

    if (hasBeenDayContract && dateBecomeDayContract) {
      const dBecomeDayContract = parse(
        dateBecomeDayContract,
        "dd/MM/yyyy",
        new Date()
      );
      const periods: YearDetail[] = [
        { begin: dEntree, end: dBecomeDayContract },
        { begin: dBecomeDayContract, end: dSortie },
      ];
      const result = accumulateAbsenceByYear(
        absencesWithExcludedAbsences,
        periods
      );
      const totalAbsenceBeforeDayContract = result[0].totalAbsenceInMonth;
      const totalAbsenceAfterDayContract = result[1].totalAbsenceInMonth;

      return {
        value:
          (differenceInMonths(dBecomeDayContract, dEntree) -
            totalAbsenceBeforeDayContract) /
            12 +
          ((differenceInMonths(dSortie, dBecomeDayContract) -
            totalAbsenceAfterDayContract) /
            12) *
            1.5,
      };
    }
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

    if (hasBeenDayContract && !dateBecomeDayContract) {
      return {
        extraInfos: {
          "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . congés plus de 12 mois":
            hasLongAbsence ? "oui" : "non",
        },
        value:
          ((differenceInMonths(dSortie, dEntree) - totalAbsence) / 12) * 1.5,
      };
    }
    return {
      extraInfos: {
        "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . congés plus de 12 mois":
          hasLongAbsence ? "oui" : "non",
      },
      value: (differenceInMonths(dSortie, dEntree) - totalAbsence) / 12,
    };
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
