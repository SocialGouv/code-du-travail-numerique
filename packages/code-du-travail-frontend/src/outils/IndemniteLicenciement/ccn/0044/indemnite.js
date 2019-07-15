import { round } from "../../../common/math";
/**
 * calcul de l'indemnite de licenciement conventionnelle
 * des industries chimiques et connexes
 */

const contains = (arr, value) => arr.indexOf(value) !== -1;

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
  const anneeAncienete = Math.floor(anciennete);
  let indemniteConventionnelle = 0;
  let formuleConventionnelle = "";
  let inputConventionnels = {
    "Salaire de référence (Sref)": salaireRef,
    "ancienneté totale": round(anciennete),
    "ancienneté (en année entière)": anneeAncienete,
    groupe,
    ...(age && { age }),
    ...(hasOpe && { "affiliation à une OPE": hasOpe ? "oui" : "non" }),
    ...(hasOpe && isEco && { "licenciement économique": isEco ? "oui" : "non" })
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
        formuleConventionnelle = `Sref`;
      }
    }
    // le salarié a plus de 2ans d'anciennté
    else if (anneeAncienete >= 2) {
      indemniteConventionnelle = (3 / 10) * salaireRef * anciennete;
      formuleConventionnelle = `(3 / 10) * Sref * "ancienneté" `;
    }
    // Pour les salarié avec plus de 5ans d'ancienneté
    if (anneeAncienete >= 5) {
      // le salarié a entre 50 et 55ans
      if (age >= 50 && age < 55) {
        indemniteConventionnelle += salaireRef;
        formuleConventionnelle += ` + Sref`;
        if (isEco && hasOpe) {
          indemniteConventionnelle += salaireRef;
          formuleConventionnelle += ` * 2`;
        }
      }
      // le salarié a plus de 55ans
      else if (age >= 55) {
        indemniteConventionnelle += salaireRef * 2;
        formuleConventionnelle += ` + Sref * 2`;
      }
    }
    // l'indemnité ne peut exéder 14mois de salaire
    if (indemniteConventionnelle > salaireRef * 14) {
      indemniteConventionnelle = salaireRef * 14;
      formuleConventionnelle = `Sref * 14`;
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
        formuleConventionnelle = `Sref`;
      }
    }
    // le salarié a entre 2 et 10ans d'anciennté
    else if (anneeAncienete >= 2 && anneeAncienete < 10) {
      indemniteConventionnelle = (3 / 10) * salaireRef * anciennete;
      formuleConventionnelle = `(3 / 10) * Sref * "ancienneté"`;
    }
    // le salarié a entre 10 et 20ans d'anciennté
    else if (anneeAncienete >= 10 && anneeAncienete < 20) {
      indemniteConventionnelle = (4 / 10) * salaireRef * anciennete;
      formuleConventionnelle = `(4 / 10) * Sref * "ancienneté"`;
    }
    // le salarié a plus de 20ans d'anciennté
    else if (anneeAncienete >= 20) {
      indemniteConventionnelle = (5 / 10) * salaireRef * anciennete;
      formuleConventionnelle = `(5 / 10) *  Sref * "ancienneté"`;
    }
    // Pour les salariés qui ont plus de 5ans d'ancienneté
    if (anneeAncienete >= 5) {
      // le salarié a entre 50 et 55ans
      if (age >= 50 && age < 55) {
        indemniteConventionnelle += salaireRef;
        formuleConventionnelle += `+ Sref`;
        if (hasOpe && isEco) {
          indemniteConventionnelle += salaireRef;
          formuleConventionnelle += `* 2`;
        }
      }
      // le salarié a entre 50 et 55ans
      else if (age >= 55) {
        indemniteConventionnelle += salaireRef * 2;
        formuleConventionnelle += `+ Sref * 2`;
      }
    }
    // l'indemnité ne peut exéder 18mois de salaire
    if (indemniteConventionnelle > salaireRef * 18) {
      indemniteConventionnelle = salaireRef * 18;
      formuleConventionnelle = `Sref * 18`;
    }
  }
  // le salarié appartient au groupe V
  else if (groupe === "V") {
    // le salarié a entre 1 et 2ans d'anciennté
    if (anneeAncienete >= 1 && anneeAncienete < 2) {
      indemniteConventionnelle = indemnite;
      if (hasOpe && isEco) {
        indemniteConventionnelle = salaireRef;
        formuleConventionnelle = `Sref`;
      }
    }
    // le salarié a entre 2 et 10ans d'anciennté
    else if (anneeAncienete >= 2 && anneeAncienete < 10) {
      indemniteConventionnelle = (4 / 10) * salaireRef * anciennete;
      formuleConventionnelle = `(4 / 10) * Sref  * "ancienneté"`;
    }
    // le salarié a entre 10 et 15ans d'anciennté
    else if (anneeAncienete >= 10 && anneeAncienete < 15) {
      indemniteConventionnelle = (6 / 10) * salaireRef * anciennete;
      formuleConventionnelle = `(6 / 10) * Sref  * "ancienneté"`;
    }
    // le salarié a plus de 15ans d'anciennté
    else if (anneeAncienete >= 15) {
      indemniteConventionnelle = (8 / 10) * salaireRef * anciennete;
      formuleConventionnelle = `(8 / 10) * Sref  * "ancienneté"`;
    }
    // Pour les salariés qui ont plus de 5ans d'ancienneté
    if (anneeAncienete > 6) {
      // le salarié a entre 45 et 55ans
      if (age >= 45 && age < 55) {
        indemniteConventionnelle += salaireRef;
        formuleConventionnelle += ` + Sref`;
        if (hasOpe && isEco && age >= 50) {
          indemniteConventionnelle += salaireRef;
          formuleConventionnelle += `* 2`;
        }
      }
      // le salarié a plus de 55ans
      else if (age >= 55) {
        indemniteConventionnelle += salaireRef * 2;
        formuleConventionnelle += `Sref * 2`;
      }
    }
    // l'indemnité ne peut exéder 20mois de salaire
    if (indemniteConventionnelle > salaireRef * 20) {
      formuleConventionnelle = `Sref * 20`;
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
    formuleConventionnelle = `Sref * 2`;
  }

  return {
    indemniteConventionnelle: round(indemniteConventionnelle),
    formuleConventionnelle,
    inputConventionnels
  };
}
