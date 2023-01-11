import { differenceInMonths, parse } from "date-fns";

import type {
  ISeniority,
  Motif,
  SeniorityProps,
  SeniorityResult,
  SupportedCcIndemniteLicenciement,
} from "../../common";
import { MotifKeys } from "../../common/motif-keys";

export class Seniority1090
  implements ISeniority<SupportedCcIndemniteLicenciement.default> {
  protected motifs: Motif[];

  constructor(motifs: Motif[]) {
    this.motifs = motifs;
  }

  computeSeniority({
    dateEntree,
    dateSortie,
    absencePeriods = [],
  }: SeniorityProps<SupportedCcIndemniteLicenciement.default>): SeniorityResult {
    const dEntree = parse(dateEntree, "dd/MM/yyyy", new Date());
    const dSortie = parse(dateSortie, "dd/MM/yyyy", new Date());
    const totalAbsence =
      absencePeriods
        .filter((period) => Boolean(period.durationInMonth))
        .reduce<number>((total, item) => {
          const m = this.motifs.find((motif) => motif.key === item.motif.key);
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
      absencePeriods
        .filter((period) => Boolean(period.durationInMonth))
        .find(
          (period) =>
            period.motif.key === MotifKeys.congesParentalEducationTotal
        )
        ? {
            extraInfos: {
              "contrat salarié . convention collective . automobiles . indemnité de licenciement . congé parental d'éducation à temps plein":
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

export const MOTIFS_1090: Motif[] = [
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
    label: "Congé parental d'éducation à temps plein",
    value: 0.5,
  },
  { key: MotifKeys.congesSansSolde, label: "Congés sans solde", value: 0 },
  { key: MotifKeys.greve, label: "Grève", value: 0 },
  { key: MotifKeys.miseAPied, label: "Mise à pied", value: 0 },
  { key: MotifKeys.congesPaternite, label: "Congé de paternité", value: 0 },
];
