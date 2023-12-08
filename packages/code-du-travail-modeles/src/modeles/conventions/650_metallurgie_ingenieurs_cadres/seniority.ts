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
  computeSeniority({
    dateEntree,
    dateSortie,
    absencePeriods = [],
    categoriePro,
    hasBeenDayContract,
    dateBecomeDayContract,
    hasBeenExecutive,
  }: SeniorityProps<SupportedCcIndemniteLicenciement.IDCC650>): SeniorityResult {
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
      case undefined:
        return this.compute(dateEntree, dateSortie, absencePeriods);
    }
  }

  computeRequiredSeniority({
    dateEntree,
    dateNotification,
    absencePeriods = [],
    categoriePro,
    hasBeenDayContract,
    dateBecomeDayContract,
    hasBeenExecutive,
  }: SeniorityRequiredProps<SupportedCcIndemniteLicenciement.IDCC650>): RequiredSeniorityResult {
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
      case undefined:
        return this.compute(dateEntree, dateNotification, absencePeriods);
    }
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
