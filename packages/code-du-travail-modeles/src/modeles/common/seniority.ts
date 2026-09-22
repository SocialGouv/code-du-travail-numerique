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
import { MotifKeys } from "./motif-keys";

export const ARRET_DE_TRAVAIL =
  "contrat salarié . indemnité de licenciement . arrêt de travail";
export const DATE_ARRET_DE_TRAVAIL =
  "contrat salarié . indemnité de licenciement . date d'arrêt de travail";

export type DefaultSeniorityProps = {
  dateEntree: string;
  dateSortie: string;
  absencePeriods?: Absence[];
};

export type DefaultSeniorityRequiredProps = DefaultSeniorityProps & {
  dateNotification: string;
};

export abstract class SeniorityDefault<
  T extends SupportedCc,
> implements ISeniority<T> {
  mapSituation(args: Record<string, string | undefined>): SeniorityProps<T> {
    const dateSortie =
      args["contrat salarié . indemnité de licenciement . date de sortie"] ??
      "";
    return {
      absencePeriods: [
        ...this.parseAbsencePeriods(args),
        ...this.arretDeTravail(args, dateSortie),
      ],
      dateEntree:
        args["contrat salarié . indemnité de licenciement . date d'entrée"] ??
        "",
      dateSortie,
    } as SeniorityProps<T>;
  }

  mapRequiredSituation(
    args: Record<string, string | undefined>
  ): SeniorityRequiredProps<T> {
    const dateNotification =
      args[
        "contrat salarié . indemnité de licenciement . date de notification"
      ] ?? "";
    return {
      absencePeriods: [
        ...this.parseAbsencePeriods(args),
        ...this.arretDeTravail(args, dateNotification),
      ],
      dateEntree:
        args["contrat salarié . indemnité de licenciement . date d'entrée"] ??
        "",
      dateNotification,
      dateSortie:
        args["contrat salarié . indemnité de licenciement . date de sortie"] ??
        "",
    } as SeniorityRequiredProps<T>;
  }

  /**
   * Arrêt de travail en cours au moment de la rupture, retiré de l'ancienneté
   * comme le serait une absence pour maladie non professionnelle saisie à
   * l'étape « Absences » : il en reprend le motif, donc le coefficient propre
   * à chaque convention collective, et n'a aucun effet pour celles qui ne
   * retirent pas cette absence.
   *
   * La période court du début de l'arrêt jusqu'à `until` inclus, avec le même
   * comptage en mois entiers que `compute` : la date de sortie pour
   * l'ancienneté du calcul, la date de notification pour l'ancienneté requise,
   * un arrêt qui débute après n'ayant alors pas d'effet.
   *
   * Le parcours ne demande pas l'origine de l'arrêt ; un arrêt consécutif à un
   * accident du travail ou à une maladie professionnelle (art. L1226-7) est
   * donc retiré à tort — limite assumée, la même que pour le champ « Absence
   * pour maladie non professionnelle ».
   */
  protected arretDeTravail(
    args: Record<string, string | undefined>,
    until: string
  ): Absence[] {
    const startedAt = args[DATE_ARRET_DE_TRAVAIL];
    if (args[ARRET_DE_TRAVAIL] !== "oui" || !startedAt || !until) {
      return [];
    }
    const motif = this.getMotifs().find(
      (item) => item.key === MotifKeys.maladieNonPro
    );
    if (!motif) {
      return [];
    }
    const durationInMonth = differenceInMonths(
      addDays(parseDate(until), 1),
      parseDate(startedAt)
    );
    // Couvre aussi une durée NaN (date incomplète en cours de saisie).
    if (!(durationInMonth > 0)) {
      return [];
    }
    return [
      {
        durationInMonth,
        motif: {
          ...motif,
          label: "Arrêt de travail au moment de la rupture du contrat",
        },
        startedAt,
      },
    ];
  }

  private parseAbsencePeriods(
    args: Record<string, string | undefined>
  ): Absence[] {
    return args.absencePeriods ? JSON.parse(args.absencePeriods) : [];
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
