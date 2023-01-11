import { addDays, differenceInMonths, parse } from "date-fns";

import type {
  Absence,
  ISeniority,
  Motif,
  RequiredSeniorityResult,
  SeniorityProps,
  SeniorityRequiredProps,
  SeniorityResult,
  SupportedCcIndemniteLicenciement,
} from "../../common";
import { MotifKeys } from "../../common/motif-keys";

export class Seniority1090
  implements ISeniority<SupportedCcIndemniteLicenciement.default> {
  computeSeniority({
    dateEntree,
    dateSortie,
    absencePeriods = [],
  }: SeniorityProps<SupportedCcIndemniteLicenciement.default>): SeniorityResult {
    return this.compute(dateEntree, dateSortie, absencePeriods);
  }

  computeRequiredSeniority({
    dateEntree,
    dateNotification,
    absencePeriods = [],
  }: SeniorityRequiredProps): RequiredSeniorityResult {
    return this.compute(dateEntree, dateNotification, absencePeriods);
  }

  getMotifs(): Motif[] {
    return MOTIFS_1090;
  }

  private compute(
    from: string,
    to: string,
    absences: Absence[]
  ): SeniorityResult {
    const dEntree = parse(from, "dd/MM/yyyy", new Date());
    const dSortie = addDays(parse(to, "dd/MM/yyyy", new Date()), 1);
    const totalAbsence =
      absences
        .filter((period) => Boolean(period.durationInMonth))
        .reduce<number>((total, item) => {
          const m = this.getMotifs().find(
            (motif) => motif.key === item.motif.key
          );
          if (!m || !item.durationInMonth) {
            return total;
          }
          if (
            m.key === MotifKeys.maladieNonPro ||
            m.key === MotifKeys.accidentTrajet
          ) {
            const newValue = Math.max(0, (item.durationInMonth - 6) * m.value);
            return total + newValue;
          }
          return total + item.durationInMonth * m.value;
        }, 0) / 12;
    return Object.assign(
      absences
        .filter((period) => Boolean(period.durationInMonth))
        .find(
          (period) =>
            period.motif.key === MotifKeys.congesParentalEducationTotal
        )
        ? {
            extraInfos: {
              "contrat salarié . convention collective . automobiles . indemnité de licenciement . congé parental d'éducation total":
                "oui",
            },
          }
        : {},
      {
        value: differenceInMonths(dSortie, dEntree) / 12 - totalAbsence,
      }
    );
  }
}

const MOTIFS_1090: Motif[] = [
  {
    key: MotifKeys.maladieNonPro,
    label: "Absence pour maladie non professionnelle",
    value: 0,
  },
  {
    key: MotifKeys.accidentTrajet,
    label: "Arrêt maladie lié à un accident de trajet",
    value: 0,
  },
  { key: MotifKeys.congesSabbatique, label: "Congé sabbatique", value: 0 },
  {
    key: MotifKeys.congesCreationEntreprise,
    label: "Congé pour création d'entreprise",
    value: 0,
  },
  {
    key: MotifKeys.congesParentalEducationTotal,
    label: "Congé parental d'éducation total",
    value: 0.5,
  },
  { key: MotifKeys.congesSansSolde, label: "Congés sans solde", value: 0 },
  { key: MotifKeys.greve, label: "Grève", value: 0 },
  { key: MotifKeys.miseAPied, label: "Mise à pied", value: 0 },
  { key: MotifKeys.congesPaternite, label: "Congé de paternité", value: 0 },
];
