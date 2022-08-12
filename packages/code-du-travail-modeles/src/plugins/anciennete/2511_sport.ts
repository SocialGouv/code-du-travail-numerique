import type { Motif } from "./types";

export const MOTIFS_2511: Motif[] = [
  {
    key: "absenceMaladieNonPro",
    label: "Absence pour maladie non professionnelle",
    value: 1,
  },
  {
    key: "absenceAccidentTrajet",
    label: "Arrêt maladie lié à un accident de trajet",
    value: 0,
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
  { key: "absenceCongesPaternite", label: "Congé de paternité", value: 0 },
];
