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
import { accumulateAbsenceByYear, parseDate } from "../../common";
import { SeniorityDefault } from "../../common/seniority";

export type CC3248SeniorityProps = DefaultSeniorityProps & {
  categoriePro: "'ABCDE'" | "'FGHI'";
  hasBeenDayContract: boolean;
  dateBecomeDayContract?: string;
};

export type CC3248SeniorityRequiredProps = DefaultSeniorityRequiredProps & {
  categoriePro: "'ABCDE'" | "'FGHI'";
  hasBeenDayContract: boolean;
  dateBecomeDayContract?: string;
};

export class Seniority3248 extends SeniorityDefault<SupportedCcIndemniteLicenciement.IDCC3248> {
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
  }: SeniorityProps<SupportedCcIndemniteLicenciement.IDCC3248>): SeniorityResult {
    switch (categoriePro) {
      case "'ABCDE'":
        return this.computeABCDE(
          dateEntree,
          dateSortie,
          absencePeriods,
          hasBeenDayContract,
          dateBecomeDayContract
        );
      case "'FGHI'":
        return this.computeFGHI(dateEntree, dateSortie);
    }
  }

  computeRequiredSeniority({
    dateEntree,
    dateNotification,
    absencePeriods = [],
    categoriePro,
    hasBeenDayContract,
    dateBecomeDayContract,
  }: SeniorityRequiredProps<SupportedCcIndemniteLicenciement.IDCC3248>): RequiredSeniorityResult {
    switch (categoriePro) {
      case "'ABCDE'":
        return this.computeABCDE(
          dateEntree,
          dateNotification,
          absencePeriods,
          hasBeenDayContract,
          dateBecomeDayContract
        );
      case "'FGHI'":
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
    hasBeenDayContract: boolean,
    dateBecomeDayContract: string | undefined
  ): SeniorityResult {
    const dEntree = parseDate(from);
    const dSortie = addDays(parseDate(to), 1);
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
      const result = accumulateAbsenceByYear(absences, periods);
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
    const totalAbsence = absences
      .filter(
        (absence) => absence.durationInMonth && absence.durationInMonth > 12
      )
      .reduce((total, item) => {
        if (item.durationInMonth) {
          return total + item.durationInMonth;
        }
        return total;
      }, 0);
    if (hasBeenDayContract && !dateBecomeDayContract) {
      return {
        value:
          ((differenceInMonths(dSortie, dEntree) - totalAbsence) / 12) * 1.5,
      };
    }
    return {
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
