import type { Motif, SupportedCcIndemniteLicenciement } from "../common";
import { MotifKeys } from "../common/motif-keys";
import { SeniorityDefault } from "../common/seniority";

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

export class SeniorityLegal extends SeniorityDefault<SupportedCcIndemniteLicenciement.default> {
  getMotifs(): Motif[] {
    return LEGAL_MOTIFS;
  }
}
