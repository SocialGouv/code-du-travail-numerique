import { addDays, differenceInMonths } from "date-fns";

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
} from "../../common";
import { parseDate } from "../../common";
import { SeniorityDefault } from "../../common/seniority";
import { Seniority3248 } from "../3248_metallurgie";

export type CC650SeniorityProps = DefaultSeniorityProps & {
  categoriePro?: "'A, B, C, D ou E'" | "'F, G, H ou I'";
  hasBeenDayContract: boolean;
  hasBeenExecutive: boolean;
  dateBecomeDayContract?: string;
};

export type CC650SeniorityRequiredProps = DefaultSeniorityRequiredProps & {
  categoriePro?: "'A, B, C, D ou E'" | "'F, G, H ou I'";
  hasBeenDayContract: boolean;
  hasBeenExecutive: boolean;
  dateBecomeDayContract?: string;
};

const MOTIFS_650: Motif[] = LEGAL_MOTIFS.map((item) => ({
  ...item,
  startAt: (data) => {
    return (
      data[
        "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . forfait jour . date"
      ] !== undefined
    );
  },
  value: 0,
}));

export class Seniority650 extends SeniorityDefault<SupportedCcIndemniteLicenciement.IDCC650> {
  mapSituation(
    args: Record<string, string | undefined>
  ): SeniorityProps<SupportedCcIndemniteLicenciement.IDCC650> {
    return this.map(args);
  }

  mapRequiredSituation(
    args: Record<string, string | undefined>
  ): SeniorityRequiredProps<SupportedCcIndemniteLicenciement.IDCC650> {
    return this.map(args);
  }

  computeSeniority({
    dateEntree,
    dateSortie,
    absencePeriods = [],
    categoriePro,
    hasBeenDayContract,
    dateBecomeDayContract,
    hasBeenExecutive,
  }: SeniorityProps<SupportedCcIndemniteLicenciement.IDCC650>): SeniorityResult {
    const seniority3248 = new Seniority3248();
    if (categoriePro) {
      return seniority3248.computeSeniority({
        absencePeriods,
        categoriePro,
        dateBecomeDayContract,
        dateEntree,
        dateSortie,
        hasBeenDayContract,
        hasBeenExecutive,
      });
    }
    return this.compute(dateEntree, dateSortie, absencePeriods);
  }

  computeRequiredSeniority({
    dateEntree,
    dateNotification,
    dateSortie,
    absencePeriods = [],
    categoriePro,
    hasBeenDayContract,
    dateBecomeDayContract,
    hasBeenExecutive,
  }: SeniorityRequiredProps<SupportedCcIndemniteLicenciement.IDCC650>): RequiredSeniorityResult {
    const seniority3248 = new Seniority3248();
    if (categoriePro) {
      return seniority3248.computeRequiredSeniority({
        absencePeriods,
        categoriePro,
        dateBecomeDayContract,
        dateEntree,
        dateNotification,
        dateSortie,
        hasBeenDayContract,
        hasBeenExecutive,
      });
    }
    return this.compute(dateEntree, dateNotification, absencePeriods);
  }

  getMotifs(): Motif[] {
    return MOTIFS_650;
  }

  protected compute(
    from: string,
    to: string,
    absences: Absence[]
  ): SeniorityResult {
    const dEntree = parseDate(from);
    const dSortie = addDays(parseDate(to), 1);
    const totalAbsence = absences
      .filter((period) => Boolean(period.durationInMonth))
      .reduce((total, item) => {
        const m = this.getMotifs().find(
          (motif) => motif.key === item.motif.key
        );
        if (!m || !item.durationInMonth) {
          return total;
        }
        return total + item.durationInMonth * m.value;
      }, 0);
    return {
      value: (differenceInMonths(dSortie, dEntree) - totalAbsence) / 12,
    };
  }

  private map(
    args: Record<string, string | undefined>
  ): SeniorityRequiredProps<SupportedCcIndemniteLicenciement.IDCC650> {
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
    };
  }
}
