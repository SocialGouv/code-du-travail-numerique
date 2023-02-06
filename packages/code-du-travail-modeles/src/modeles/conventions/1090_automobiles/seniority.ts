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

    const totalAbsence = absences.reduce((total, item) => {
      const m = this.getMotifs().find((motif) => motif.key === item.motif.key);
      if (item.durationInMonth === undefined || !m) {
        return total;
      }
      if (
        item.motif.key === MotifKeys.maladieNonPro ||
        item.motif.key === MotifKeys.accidentTrajet
      ) {
        return total + Math.max(item.durationInMonth - 6, 0);
      }
      return total + item.durationInMonth * m.value;
    }, 0);

    return Object.assign(
      absences
        .filter((period) => Boolean(period.durationInMonth))
        .find(
          (period) =>
            period.motif.key === MotifKeys.congesParentalEducationTempsPlein
        )
        ? {
            extraInfos: {
              "contrat salarié . convention collective . automobiles . indemnité de licenciement . congé parental d'éducation à temps plein":
                "oui",
            },
          }
        : {},
      {
        value: (differenceInMonths(dSortie, dEntree) - totalAbsence) / 12,
      }
    );
  }
}

const MOTIFS_1090: Motif[] = [
  {
    key: MotifKeys.maladieNonPro,
    label: "Absence pour maladie non professionnelle",
    value: 1,
  },
  {
    key: MotifKeys.accidentTrajet,
    label: "Arrêt maladie lié à un accident de trajet",
    value: 1,
  },
  { key: MotifKeys.congesSabbatique, label: "Congé sabbatique", value: 0 },
  {
    key: MotifKeys.congesCreationEntreprise,
    label: "Congé pour création d'entreprise",
    value: 0,
  },
  {
    key: MotifKeys.congesParentalEducationTempsPlein,
    label: "Congé parental d'éducation à temps plein",
    value: 0.5,
  },
  { key: MotifKeys.congesSansSolde, label: "Congés sans solde", value: 0 },
  { key: MotifKeys.greve, label: "Grève", value: 0 },
  { key: MotifKeys.miseAPied, label: "Mise à pied", value: 0 },
  { key: MotifKeys.congesPaternite, label: "Congé de paternité", value: 0 },
];
