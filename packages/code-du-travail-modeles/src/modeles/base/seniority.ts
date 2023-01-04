import { differenceInMonths, parse } from "date-fns";

import type {
  Absence,
  ISeniority,
  Motif,
  RequiredSeniorityResult,
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

export type LegalSeniorityRequiredProps = LegalSeniorityProps & {
  dateNotification: string;
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
    return this.compute(dateEntree, dateSortie, absencePeriods);
  }

  computeRequiredSeniority({
    dateEntree,
    dateNotification,
    absencePeriods = [],
  }: LegalSeniorityRequiredProps): RequiredSeniorityResult {
    return this.compute(dateEntree, dateNotification, absencePeriods);
  }

  getMotifs(): Motif[] {
    return this.motifs;
  }

  protected compute(
    from: string,
    to: string,
    absences: Absence[]
  ): SeniorityResult {
    const dEntree = parse(from, "dd/MM/yyyy", new Date());
    const dSortie = parse(to, "dd/MM/yyyy", new Date());
    const totalAbsence =
      absences
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
