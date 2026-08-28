// Titres canoniques des simulateurs, tels qu'ils partent dans la clé `simulator`
// du payload des events.
//
// En production, `SimulatorLayout` reçoit ce titre depuis `tool.title` (chargé en
// base) : ces constantes servent aux émetteurs qui n'ont pas accès au layout —
// les hooks d'`eventEmitter` (résultat inéligible, convention bloquante) et les
// stores de step. Elles doivent donc rester ALIGNÉES sur les titres en base,
// sans quoi un même simulateur apparaîtrait sous deux libellés dans Matomo.
export enum SimulatorTitle {
  INDEMNITE_LICENCIEMENT = "Indemnité de licenciement",
  INDEMNITE_RUPTURE_CONVENTIONNELLE = "Indemnité de rupture conventionnelle",
  INDEMNITE_PRECARITE = "Indemnités de précarité",
  PREAVIS_DEMISSION = "Préavis de démission",
  PREAVIS_LICENCIEMENT = "Préavis de licenciement",
  PREAVIS_RETRAITE = "Préavis de départ ou de mise à la retraite",
  HEURES_RECHERCHE_EMPLOI = "Heures d'absence pour rechercher un emploi",
}
