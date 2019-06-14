import { round } from "../math";
/**
 * calcul de l'indemnite de licenciement conventionnelle
 * PROPRETE ENTREPRISES ET SERVICES ASSOCIES - IDCC 3043
 * https://github.com/SocialGouv/code-du-travail-numerique/issues/883
 */

export function getSalaireRef({ salaireRefLegal }) {
  return salaireRefLegal;
}

export function getIndemnite({ salaireRef, anciennete }) {
  let error;
  let remainingAnciennete = anciennete;
  let indemniteConventionnelle = 0;
  let formulas = [];

  if (remainingAnciennete > 10) {
    indemniteConventionnelle +=
      (1 / 5) * salaireRef * (remainingAnciennete - 10);
    formulas.push(`1/5 * ${round(salaireRef)} * (${remainingAnciennete} - 10)`);
    remainingAnciennete = 10;
  }
  if (remainingAnciennete > 5) {
    indemniteConventionnelle = (1 / 6) * salaireRef * (remainingAnciennete - 5);
    formulas.push(`1/6 * ${round(salaireRef)} * (${remainingAnciennete} - 5)`);
    remainingAnciennete = 5;
  }
  if (remainingAnciennete > 2) {
    indemniteConventionnelle = (1 / 10) * salaireRef * remainingAnciennete;
    formulas.push(` + 1/10 * ${round(salaireRef)} * ${remainingAnciennete}`);
  } else {
    error =
      "Aucune indemnité de licenciement n'est prévue en deça de 2 ans d'ancienneté.";
  }

  return {
    indemniteConventionnelle: round(indemniteConventionnelle),
    formula: formulas.map(formula => `( ${formula} )`).join(" + "),
    error
  };
}
