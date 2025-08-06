import { addDays, differenceInMonths } from "date-fns";

import type {
  Absence,
  ISeniority,
  Motif,
  RequiredSeniorityResult,
  SeniorityProps,
  SeniorityRequiredProps,
  SeniorityResult,
  SupportedCc,
} from "./index";
import { parseDate } from "./index";

export type DefaultSeniorityProps = {
  dateEntree: string;
  dateSortie: string;
  absencePeriods?: Absence[];
};

export type DefaultSeniorityRequiredProps = DefaultSeniorityProps & {
  dateNotification: string;
  dateArretTravail?: string;
};

export abstract class SeniorityDefault<T extends SupportedCc>
  implements ISeniority<T>
{
  mapSituation(args: Record<string, string | undefined>): SeniorityProps<T> {
    const absencePeriods: Absence[] = args.absencePeriods
      ? JSON.parse(args.absencePeriods)
      : [];
    return {
      absencePeriods,
      dateEntree:
        args["contrat salarié . indemnité de licenciement . date d'entrée"] ??
        "",
      dateSortie:
        args["contrat salarié . indemnité de licenciement . date de sortie"] ??
        "",
    } as SeniorityProps<T>;
  }

  mapRequiredSituation(
    args: Record<string, string | undefined>
  ): SeniorityRequiredProps<T> {
    const absencePeriods: Absence[] = args.absencePeriods
      ? JSON.parse(args.absencePeriods)
      : [];
    return {
      absencePeriods,
      dateEntree:
        args["contrat salarié . indemnité de licenciement . date d'entrée"] ??
        "",
      dateNotification:
        args[
          "contrat salarié . indemnité de licenciement . date de notification"
        ] ?? "",
      dateArretTravail:
        args["contrat salarié . indemnité de licenciement . date d'arrêt"] ??
        undefined,
      dateSortie:
        args["contrat salarié . indemnité de licenciement . date de sortie"] ??
        "",
    } as SeniorityRequiredProps<T>;
  }

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
    dateArretTravail,
    absencePeriods = [],
  }: DefaultSeniorityRequiredProps): RequiredSeniorityResult {
    // If dateArretTravail exists, use it instead of dateNotification
    const dateToUse = dateArretTravail || dateNotification;
    return this.compute(dateEntree, dateToUse, absencePeriods);
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
