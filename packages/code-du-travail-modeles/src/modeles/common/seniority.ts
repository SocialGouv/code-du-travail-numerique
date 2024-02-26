import { addDays, differenceInMonths } from "date-fns";

import type {
  Absence,
  ISeniority,
  Motif,
  RequiredSeniorityResult,
  SeniorityProps,
  SeniorityRequiredProps,
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

export type SeniorityType =
  | "indemnite-licenciement"
  | "rupture-conventionnelle";

export abstract class SeniorityDefault<
  T extends SupportedCcIndemniteLicenciement
> implements ISeniority<T>
{
  private readonly dateEntreeNamespace: string;

  private readonly dateSortieNamespace: string;

  private readonly dateNotificationNamespace: string;

  constructor(type: SeniorityType) {
    if (type === "rupture-conventionnelle") {
      this.dateEntreeNamespace =
        "contrat salarié . rupture conventionnelle . date d'entrée";
      this.dateSortieNamespace =
        "contrat salarié . rupture conventionnelle . date de sortie";
      this.dateNotificationNamespace =
        "contrat salarié . rupture conventionnelle . date de notification";
    } else {
      this.dateEntreeNamespace =
        "contrat salarié . indemnité de licenciement . date d'entrée";
      this.dateSortieNamespace =
        "contrat salarié . indemnité de licenciement . date de sortie";
      this.dateNotificationNamespace =
        "contrat salarié . indemnité de licenciement . date de notification";
    }
  }

  mapSituation(args: Record<string, string | undefined>): SeniorityProps<T> {
    const absencePeriods: Absence[] = args.absencePeriods
      ? JSON.parse(args.absencePeriods)
      : [];
    return {
      absencePeriods,
      dateEntree: args[this.dateEntreeNamespace] ?? "",
      dateSortie: args[this.dateSortieNamespace] ?? "",
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
      dateEntree: args[this.dateEntreeNamespace] ?? "",
      dateNotification: args[this.dateNotificationNamespace] ?? "",
      dateSortie: args[this.dateSortieNamespace] ?? "",
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
