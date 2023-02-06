import { addDays, differenceInMonths, parse } from "date-fns";

import type {
  Absence,
  ISeniority,
  Motif,
  RequiredSeniorityResult,
  SeniorityProps,
  SeniorityResult,
  SupportedCcIndemniteLicenciement,
} from "./index";

export type DefaultSeniorityProps = {
  dateEntree: string;
  dateSortie: string;
  absencePeriods?: Absence[];
};

export type DefaultSeniorityRequiredProps = DefaultSeniorityProps & {
  dateNotification: string;
};

export abstract class SeniorityDefault<
  T extends SupportedCcIndemniteLicenciement
> implements ISeniority<T> {
  computeSeniority({
    dateEntree,
    dateSortie,
    absencePeriods = [],
  }: SeniorityProps<T>): SeniorityResult {
    return this.compute(dateEntree, dateSortie, absencePeriods);
  }

  computeRequiredSeniority({
    dateEntree,
    dateNotification,
    absencePeriods = [],
  }: DefaultSeniorityRequiredProps): RequiredSeniorityResult {
    return this.compute(dateEntree, dateNotification, absencePeriods);
  }

  protected compute(
    from: string,
    to: string,
    absences: Absence[]
  ): SeniorityResult {
    const dEntree = parse(from, "dd/MM/yyyy", new Date());
    const dSortie = addDays(parse(to, "dd/MM/yyyy", new Date()), 1);
    const totalAbsence =
      absences
        .filter((period) => Boolean(period.durationInMonth))
        .reduce((total, item) => {
          const m = this.getMotifs().find(
            (motif) => motif.key === item.motif.key
          );
          if (!m || !item.durationInMonth) {
            return total;
          }
          return total + item.durationInMonth * m.value;
        }, 0) / 12;
    return {
      value: differenceInMonths(dSortie, dEntree) / 12 - totalAbsence,
    };
  }

  abstract getMotifs(): Motif[];
}
