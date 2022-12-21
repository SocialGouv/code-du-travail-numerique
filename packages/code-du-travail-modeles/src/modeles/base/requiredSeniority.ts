import { differenceInMonths, parse } from "date-fns";

import type {
  Absence,
  ISeniority,
  Motif,
  SeniorityProps,
  SeniorityResult,
  SupportedCcIndemniteLicenciement,
} from "../common";
import { MotifKeys } from "../common/motif-keys";

export const LEGAL_MOTIFS: Motif[] = [
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
  { key: MotifKeys.congesSabbatique, label: "Congé sabbatique", value: 1 },
  {
    key: MotifKeys.congesCreationEntreprise,
    label: "Congé pour création d'entreprise",
    value: 1,
  },
  {
    key: MotifKeys.congesParentalEducation,
    label: "Congé parental d'éducation",
    value: 0.5,
  },
  { key: MotifKeys.congesSansSolde, label: "Congés sans solde", value: 1 },
  { key: MotifKeys.greve, label: "Grève", value: 1 },
  { key: MotifKeys.miseAPied, label: "Mise à pied", value: 1 },
  { key: MotifKeys.congesPaternite, label: "Congé de paternité", value: 1 },
];

export type LegalSeniorityProps = {
  dateEntree: string;
  dateSortie: string;
  absencePeriods?: Absence[];
};

export class SeniorityLegal
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
        .reduce((total, item) => {
          const m = this.motifs.find((motif) => motif.key === item.motif.key);
          if (!m || !item.durationInMonth) {
            return total;
          }
          return total + item.durationInMonth * m.value;
        }, 0) / 12;
    return {
      value: differenceInMonths(dSortie, dEntree) / 12 - totalAbsence,
    };
  }
}
