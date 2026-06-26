import { Agreement } from "src/modules/outils/indemnite-depart/types";

/**
 * Code IDCC factice renvoyé par l'annuaire des entreprises pour signifier
 * qu'un (ou plusieurs) établissement(s) de l'entité n'ont déclaré
 * « aucune convention collective ». Ce n'est pas une vraie convention.
 */
export const NO_CONVENTION_COLLECTIVE_IDCC = 9999;

export const isNoConventionCollective = (
  agreement: Pick<Agreement, "num">
): boolean => agreement.num === NO_CONVENTION_COLLECTIVE_IDCC;

/**
 * Normalise la liste des conventions d'une entreprise :
 * - retire le code IDCC factice 9999 de la liste affichée ;
 * - expose un booléen indiquant qu'au moins un établissement n'a pas
 *   de convention collective renseignée.
 *
 * Combiné au nombre de conventions « officielles » restantes, ce booléen
 * permet à toutes les surfaces d'affichage de réagir de façon cohérente :
 * - aucune convention officielle + drapeau => « pas de CC renseignée » ;
 * - au moins une convention officielle + drapeau => CC officielle(s) +
 *   bandeau « renseignée pour seulement certains établissements ».
 */
export const splitNoConventionCollective = (
  conventions: Agreement[]
): {
  conventions: Agreement[];
  hasEstablishmentWithoutConvention: boolean;
} => ({
  conventions: conventions.filter(
    (convention) => !isNoConventionCollective(convention)
  ),
  hasEstablishmentWithoutConvention: conventions.some(isNoConventionCollective),
});
