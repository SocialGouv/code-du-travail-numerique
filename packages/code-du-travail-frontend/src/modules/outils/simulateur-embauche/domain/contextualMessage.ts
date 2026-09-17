import { SMIC_PROXIMITY_MARGIN } from "./constants";
import type { ContextualMessageKey } from "./types";

type Args = {
  /** Net avant impôt **mensuel**, jamais la valeur affichée. */
  salaireNetMensuel: number | null | undefined;
  /** Net avant impôt du SMIC, en €/mois. */
  smicNetMensuel: number | null | undefined;
  margin?: number;
};

/**
 * Choisit le message contextuel à afficher sous le champ « Salaire net ».
 *
 * La comparaison est **net contre net** : comparer le net saisi au SMIC *brut*
 * donnerait un faux positif systématique, puisque tout net est mécaniquement
 * inférieur au brut correspondant.
 *
 * Elle porte toujours sur le net mensuel canonique, pas sur la valeur affichée,
 * pour que passer en mode annuel ne déplace pas le seuil d'un facteur douze.
 *
 * Le `return` unique garantit l'exclusivité mutuelle par construction : il n'y a
 * pas deux conditions à garder cohérentes, donc pas de cas où les deux messages
 * s'afficheraient ensemble ou aucun ne s'afficherait.
 */
export const selectContextualMessage = ({
  salaireNetMensuel,
  smicNetMensuel,
  margin = SMIC_PROXIMITY_MARGIN,
}: Args): ContextualMessageKey | null => {
  if (salaireNetMensuel == null || smicNetMensuel == null) {
    return null;
  }

  return salaireNetMensuel <= smicNetMensuel * (1 + margin)
    ? "salaire-minimum"
    : "primes-conventionnelles";
};
