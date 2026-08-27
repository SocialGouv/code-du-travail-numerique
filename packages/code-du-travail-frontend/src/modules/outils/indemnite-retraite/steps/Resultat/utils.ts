/**
 * Contribution « Indemnités départ à la retraite : comment calculer ? »,
 * cible du lien « en savoir plus » (RG11g).
 */
export const CONTRIBUTION_INDEMNITE_RETRAITE =
  "/contribution/a-quelles-indemnites-peut-pretendre-un-salarie-qui-part-a-la-retraite";

/**
 * TODO(#7131) — Ancres à compléter.
 *
 * Le métier demande que la mention fiscale renvoie vers l'onglet
 * « L'indemnité de [départ / mise] à la retraite est-elle soumise à cotisations
 * et imposable ? » de la contribution ci-dessus. Ces onglets n'y existent pas
 * encore : le lien pointe donc pour l'instant vers la page entière. Ajouter le
 * fragment correspondant à chaque origine dès que le contenu sera publié.
 */
export const getContributionFiscaleUrl = (_isMiseRetraite: boolean): string =>
  CONTRIBUTION_INDEMNITE_RETRAITE;

export const getForMoreInfoMessage = (): string =>
  "Le montant donné n’est qu’une estimation, il est donné à titre indicatif. Pour simplifier l’utilisation de ce simulateur, certains paramètres complexes n’ont pas été pris en compte dans le calcul de l’indemnité et peuvent donner lieu à un montant différent. Par exemple, les absences de moins d’un mois ou les contrats antérieurs au CDI ne sont pas pris en compte dans le calcul de l’ancienneté du salarié.";
