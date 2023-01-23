import type { Motif, SupportedCcIndemniteLicenciement } from "../../common";
import { MotifKeys } from "../../common/motif-keys";
import { SeniorityDefault } from "../../common/seniority";

const MOTIFS_3239: Motif[] = [
  {
    key: MotifKeys.maladieNonPro,
    label: "Absence pour maladie non professionnelle",
    value: 1,
  },
  {
    key: MotifKeys.accidentTrajet,
    label: "Arrêt maladie lié à un accident de trajet",
    value: 0,
  },
  {
    key: MotifKeys.congesParentalEducation,
    label: "Congé parental d'éducation",
    value: 0.5,
  },
  { key: MotifKeys.congesSansSolde, label: "Congés sans solde", value: 1 },
  { key: MotifKeys.greve, label: "Grève", value: 1 },
  { key: MotifKeys.miseAPied, label: "Mise à pied", value: 1 },
  { key: MotifKeys.congesPaternite, label: "Congé de paternité", value: 0 },
  {
    key: MotifKeys.convenancePro,
    label: "Congé pour convenance personnelle",
    value: 0,
  },
];

export class Seniority3239 extends SeniorityDefault<SupportedCcIndemniteLicenciement.IDCC3239> {
  getMotifs(): Motif[] {
    return MOTIFS_3239;
  }
}
