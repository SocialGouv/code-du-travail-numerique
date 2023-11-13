import { addDays, differenceInMonths } from "date-fns";

import type {
  Absence,
  ISeniority,
  Motif,
  RequiredSeniorityResult,
  SeniorityProps,
  SeniorityResult,
  SupportedCcIndemniteLicenciement,
} from "./index";
import { parseDate } from "./index";

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
> implements ISeniority<T>
{
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

  abstract getMotifs(): Motif[];
}