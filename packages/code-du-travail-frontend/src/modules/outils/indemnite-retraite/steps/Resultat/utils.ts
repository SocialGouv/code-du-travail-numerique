/**
 * Contribution « Indemnités départ à la retraite : comment calculer ? »,
 * cible du lien « en savoir plus » (RG11g).
 */
export const CONTRIBUTION_INDEMNITE_RETRAITE =
  "/contribution/a-quelles-indemnites-peut-pretendre-un-salarie-qui-part-a-la-retraite";

/**
 * TODO(#7131) — Ancres à compléter, en attente du contenu.
 *
 * Le métier demande que la mention fiscale renvoie directement vers l'onglet
 * correspondant à l'origine du départ, dans la contribution ci-dessus :
 *
 * - mise à la retraite → « L'indemnité de mise à la retraite est-elle soumise
 *   à cotisations et imposable ? »
 * - départ volontaire → « L'indemnité de départ à la retraite est-elle soumise
 *   à cotisations et imposable ? »
 *
 * Ces deux onglets n'existent pas encore dans la contribution : le lien pointe
 * donc pour l'instant vers la page entière, quelle que soit l'origine. Dès que
 * le contenu sera publié, il n'y aura qu'à renvoyer
 * `${CONTRIBUTION_INDEMNITE_RETRAITE}#<ancre>` selon `isMiseRetraite` — le
 * paramètre est déjà passé par les appelants pour cette raison.
 */
export const getContributionFiscaleUrl = (_isMiseRetraite: boolean): string =>
  CONTRIBUTION_INDEMNITE_RETRAITE;

export const getForMoreInfoMessage = (): string =>
  "Le montant donné n’est qu’une estimation, il est donné à titre indicatif. Pour simplifier l’utilisation de ce simulateur, certains paramètres complexes n’ont pas été pris en compte dans le calcul de l’indemnité et peuvent donner lieu à un montant différent. Par exemple, les absences de moins d’un mois ou les contrats antérieurs au CDI ne sont pas pris en compte dans le calcul de l’ancienneté du salarié.";
