import { differenceInMonths, parse } from "date-fns";

import type { SupportedCcIndemniteLicenciement } from "..";
import type { Absence, ISeniority, Motif, SeniorityProps } from "./types";

export const LEGAL_MOTIFS: Motif[] = [
  {
    key: "absenceMaladieNonPro",
    label: "Absence pour maladie non professionnelle",
    value: 1,
  },
  {
    key: "absenceAccidentTrajet",
    label: "Arrêt maladie lié à un accident de trajet",
    value: 1,
  },
  { key: "absenceCongesSabbatique", label: "Congé sabbatique", value: 1 },
  {
    key: "absenceCongesCreationEntreprise",
    label: "Congé pour création d'entreprise",
    value: 1,
  },
  {
    key: "absenceCongesParentalEducation",
    label: "Congé parental d'éducation",
    value: 0.5,
  },
  { key: "absenceCongesSansSolde", label: "Congés sans solde", value: 1 },
  { key: "absenceGreve", label: "Grève", value: 1 },
  { key: "absenceMiseAPied", label: "Mise à pied", value: 1 },
  { key: "absenceCongesPaternite", label: "Congé de paternité", value: 1 },
];

export type LegalSeniorityProps = {
  dateEntree: string;
  dateSortie: string;
  absencePeriods?: Absence[];
};

export class SeniorityLegal
  implements ISeniority<SupportedCcIndemniteLicenciement.default>
{
  protected motifs: Motif[];

  constructor(motifs: Motif[]) {
    this.motifs = motifs;
  }

  computeSeniority({
    dateEntree,
    dateSortie,
    absencePeriods = [],
  }: SeniorityProps<SupportedCcIndemniteLicenciement.default>): number {
    const dEntree = parse(dateEntree, "dd/MM/yyyy", new Date());
    const dSortie = parse(dateSortie, "dd/MM/yyyy", new Date());
    const totalAbsence =
      absencePeriods
        .filter((period) => Boolean(period.durationInMonth))
        .reduce((total, item) => {
          const m = this.motifs.find((motif) => motif.label === item.motif);
          if (!m || !item.durationInMonth) {
            return total;
          }
          return total + item.durationInMonth * m.value;
        }, 0) / 12;
    return differenceInMonths(dSortie, dEntree) / 12 - totalAbsence;
  }
}
