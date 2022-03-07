import { round } from "../../../common/utils";
/**
 * calcul de l'indemnite de licenciement conventionnelle
 * des industries chimiques et connexes
 */

const contains = (arr, value) => arr.indexOf(value) !== -1;

export function getSalaireRef({
  salaireRefLegal,
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
  groupe = "I",
}) {
  // ancienneté en année
  const anneeAncienete = Math.floor(anciennete);
  let indemniteConventionnelle = 0;
  let formula = "-";
  const labels = {
    "Ancienneté (en année entière)": anneeAncienete,
    "Ancienneté totale (Anc)": round(anciennete),
    Groupe: groupe,
    "Salaire de référence (Sref)": salaireRef,
    ...(age && { Age: age }),
    ...(hasOpe && { "affiliation à une OPE": hasOpe ? "oui" : "non" }),
    ...(hasOpe &&
      isEco && { "licenciement économique": isEco ? "oui" : "non" }),
  };
  // l'entreprise n'est pas affilié a une Organisation Patronale Employeur

  // le salarié appartient au groupe I, II, III
  if (contains(["I", "II", "III"], groupe)) {
    // le salarié a entre 1 et 2ans d'anciennté
    if (anneeAncienete >= 1 && anneeAncienete < 2) {
      indemniteConventionnelle = indemnite;
      // dans le cas ou il y a un OPE et un licenciement eco
      if (hasOpe && isEco) {
        indemniteConventionnelle = salaireRef;
        formula = `Sref`;
      }
    }
    // le salarié a plus de 2ans d'anciennté
    else if (anneeAncienete >= 2) {
      indemniteConventionnelle = (3 / 10) * salaireRef * anciennete;
      formula = `3 / 10 * Sref * Anc `;
    }
    // Pour les salarié avec plus de 5ans d'ancienneté
    if (anneeAncienete >= 5) {
      // le salarié a entre 50 et 55ans
      if (age >= 50 && age < 55) {
        indemniteConventionnelle += salaireRef;
        formula += ` + Sref`;
        if (isEco && hasOpe) {
          indemniteConventionnelle += salaireRef;
          formula += ` * 2`;
        }
      }
      // le salarié a plus de 55ans
      else if (age >= 55) {
        indemniteConventionnelle += salaireRef * 2;
        formula += ` + Sref * 2`;
      }
    }
    // l'indemnité ne peut exéder 14mois de salaire
    if (indemniteConventionnelle > salaireRef * 14) {
      indemniteConventionnelle = salaireRef * 14;
      formula = `Sref * 14`;
    }
  }
  // le salarié appartient au groupe IV
  else if (groupe === "IV") {
    // le salarié a entre 1 et 2ans d'anciennté
    if (anneeAncienete >= 1 && anneeAncienete < 2) {
      indemniteConventionnelle = indemnite;
      // dans le cas ou il y a un OPE et un licenciement eco
      if (hasOpe && isEco) {
        indemniteConventionnelle = salaireRef;
        formula = `Sref`;
      }
    }
    // le salarié a entre 2 et 10ans d'anciennté
    else if (anneeAncienete >= 2 && anneeAncienete < 10) {
      indemniteConventionnelle = (3 / 10) * salaireRef * anciennete;
      formula = `3 / 10 * Sref * Anc`;
    }
    // le salarié a entre 10 et 20ans d'anciennté
    else if (anneeAncienete >= 10 && anneeAncienete < 20) {
      indemniteConventionnelle = (4 / 10) * salaireRef * anciennete;
      formula = `4 / 10 * Sref * Anc`;
    }
    // le salarié a plus de 20ans d'anciennté
    else if (anneeAncienete >= 20) {
      indemniteConventionnelle = (5 / 10) * salaireRef * anciennete;
      formula = `5 / 10 *  Sref * Anc`;
    }
    // Pour les salariés qui ont plus de 5ans d'ancienneté
    if (anneeAncienete >= 5) {
      // le salarié a entre 50 et 55ans
      if (age >= 50 && age < 55) {
        indemniteConventionnelle += salaireRef;
        formula += `+ Sref`;
        if (hasOpe && isEco) {
          indemniteConventionnelle += salaireRef;
          formula += `* 2`;
        }
      }
      // le salarié a entre 50 et 55ans
      else if (age >= 55) {
        indemniteConventionnelle += salaireRef * 2;
        formula += `+ Sref * 2`;
      }
    }
    // l'indemnité ne peut exéder 18mois de salaire
    if (indemniteConventionnelle > salaireRef * 18) {
      indemniteConventionnelle = salaireRef * 18;
      formula = `Sref * 18`;
    }
  }
  // le salarié appartient au groupe V
  else if (groupe === "V") {
    // le salarié a entre 1 et 2ans d'anciennté
    if (anneeAncienete >= 1 && anneeAncienete < 2) {
      indemniteConventionnelle = indemnite;
      if (hasOpe && isEco) {
        indemniteConventionnelle = salaireRef;
        formula = `Sref`;
      }
    }
    // le salarié a entre 2 et 10ans d'anciennté
    else if (anneeAncienete >= 2 && anneeAncienete < 10) {
      indemniteConventionnelle = (4 / 10) * salaireRef * anciennete;
      formula = `2 / 5 * Sref * Anc`;
    }
    // le salarié a entre 10 et 15ans d'anciennté
    else if (anneeAncienete >= 10 && anneeAncienete < 15) {
      indemniteConventionnelle = (6 / 10) * salaireRef * anciennete;
      formula = `3 / 5 * Sref * Anc`;
    }
    // le salarié a plus de 15ans d'anciennté
    else if (anneeAncienete >= 15) {
      indemniteConventionnelle = (8 / 10) * salaireRef * anciennete;
      formula = `4 / 5 * Sref * Anc`;
    }
    // Pour les salariés qui ont plus de 5ans d'ancienneté
    if (anneeAncienete > 6) {
      // le salarié a entre 45 et 55ans
      if (age >= 45 && age < 55) {
        indemniteConventionnelle += salaireRef;
        formula += ` + Sref`;
        if (hasOpe && isEco && age >= 50) {
          indemniteConventionnelle += salaireRef;
          formula += `* 2`;
        }
      }
      // le salarié a plus de 55ans
      else if (age >= 55) {
        indemniteConventionnelle += salaireRef * 2;
        formula += `Sref * 2`;
      }
    }
    // l'indemnité ne peut exéder 20mois de salaire
    if (indemniteConventionnelle > salaireRef * 20) {
      formula = `Sref * 20`;
      indemniteConventionnelle = salaireRef * 20;
    }
  }

  if (
    isEco &&
    hasOpe &&
    anneeAncienete >= 2 &&
    indemniteConventionnelle < salaireRef * 2
  ) {
    indemniteConventionnelle = salaireRef * 2;
    formula = `Sref * 2`;
  }

  return {
    indemniteConventionnelle: round(indemniteConventionnelle),
    infoCalculConventionnel: { formula, labels },
  };
}
