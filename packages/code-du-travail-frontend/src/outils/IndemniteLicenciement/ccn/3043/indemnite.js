import { round } from "../../../common/utils";
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
  let indemniteConventionnelle = 0;
  const formula = [];
  const trancheAnciennete = {
    a10: Math.max(0, round(anciennete - 10)),
    a2: Math.min(5, round(anciennete)),
    a5: Math.min(5, Math.max(0, round(anciennete - 5))),
  };

  const labels = {
    "Ancienneté 6 ens 10ans (A2)": trancheAnciennete.a5,
    "Ancienneté au delà de 10ans (A3)": trancheAnciennete.a10,
    "Ancienneté entre 2 et 5ans (A1)": trancheAnciennete.a2,
    "Salaire de référence (Sref)": round(salaireRef),
  };

  if (trancheAnciennete.a10) {
    indemniteConventionnelle += (1 / 5) * salaireRef * trancheAnciennete.a10;
    formula.push(`1 / 5 * Sref * ${trancheAnciennete.a10}`);
  }

  if (trancheAnciennete.a5) {
    indemniteConventionnelle += (1 / 6) * salaireRef * trancheAnciennete.a10;
    formula.push(`1 / 6 * Sref * ${trancheAnciennete.a5}`);
  }

  if (trancheAnciennete.a2 > 2) {
    indemniteConventionnelle += (1 / 10) * salaireRef * trancheAnciennete.a2;
    formula.push(`1 / 10 * Sref * ${trancheAnciennete.a2}`);
  } else {
    error =
      "Aucune indemnité de licenciement n’est prévue en deçà de 2 ans d'ancienneté.";
  }

  return {
    error,
    indemniteConventionnelle: round(indemniteConventionnelle),
    infoCalculConventionnel: {
      formula: formula.map((formula) => `( ${formula} )`).join(" + "),
      labels,
    },
  };
}
