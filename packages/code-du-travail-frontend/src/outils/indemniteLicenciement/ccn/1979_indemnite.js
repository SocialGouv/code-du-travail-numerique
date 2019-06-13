import { round } from "../math";
/**
 * calcul de l'indemnite de licenciement conventionnelle
 * de la branche HCR
 */

export function getSalaireRef({
  salaireRefLegal
  // groupe,
  // salaires,
  // salaire,
  // dateNotification
}) {
  return salaireRefLegal;
}

export function getIndemnite({
  salaireRef,
  indemnite,
  anciennete,
  age,
  hasOpe = false,
  isEco = false,
  groupe = "I"
}) {
  // ancienneté en année
  //const anneeAncienete = Math.floor(anciennete);
  let indemniteConventionnelle = 0;
  let formula = "";

  return {
    indemniteConventionnelle: round(indemniteConventionnelle),
    formula
  };
}
