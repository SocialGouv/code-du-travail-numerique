const contains = (arr, value) => arr.indexOf(value) !== -1;

import { getSalaireRef } from "../indemnite";

export function getIndemnite({
  salaires,
  primes,
  anciennete,
  indemnite,
  hasOpe,
  isEco,
  age = 0,
  echelon = { groupe: "I" },
  convention
}) {
  const { moyenneSalaires } = getSalaireRef(salaires, primes, anciennete);
  let { salaireRef } = getSalaireRef(salaires, primes, anciennete);

  let dernierSalaire = 0;
  if (!salaires.isPartiel) {
    dernierSalaire = salaires.derniersMois[0] + primes / 12;
    // Pour le groupe V on prend le dernier salaire avant préavis (8ieme mois, donc 4ieme en partant de la fin )
    if (echelon && contains(["V"], echelon.groupe)) {
      dernierSalaire = salaires.derniersMois[4];
    }
    salaireRef = Math.max(moyenneSalaires, dernierSalaire);
  }

  // ancienneté en année
  const anneeAncienete = Math.floor(anciennete / 12);
  let indemniteCC = 0;
  let formula = "";

  // l'entreprise n'est pas affilié a une Organisation Patronale Employeur

  // le salarié appartient au groupe I, II, III
  if (contains(["I", "II", "III"], echelon.groupe)) {
    // le salarié a entre 1 et 2ans d'anciennté
    if (anneeAncienete >= 1 && anneeAncienete < 2) {
      indemniteCC = indemnite;
      // dans le cas ou il y a un OPE et un licenciement eco
      if (hasOpe && isEco) {
        indemniteCC = salaireRef;
        formula = `${salaireRef}`;
      }
    }
    // le salarié a plus de 2ans d'anciennté
    else if (anneeAncienete >= 2) {
      indemniteCC = ((salaireRef / 10) * 3 * anciennete) / 12;
      formula = `(${salaireRef} / 10) * 3 * (${anciennete} / 12)`;
    }
    // Pour les salarié avec plus de 5ans d'ancienneté
    if (anneeAncienete >= 5) {
      // le salarié a entre 50 et 55ans
      if (age >= 50 && age < 55) {
        indemniteCC += salaireRef;
        formula += ` + ${salaireRef}`;
        if (isEco && hasOpe) {
          indemniteCC += salaireRef;
          formula += ` * 2`;
        }
      }
      // le salarié a plus de 55ans
      else if (age >= 55) {
        indemniteCC += salaireRef * 2;
        formula += ` + ${salaireRef} * 2`;
      }
    }
    // l'indemnité ne peut exéder 14mois de salaire
    if (indemniteCC > salaireRef * 14) {
      indemniteCC = salaireRef * 14;
      formula = `\\min ${salaireRef} * 14`;
    }
  }
  // le salarié appartient au groupe IV
  else if (echelon.groupe === "IV") {
    // le salarié a entre 1 et 2ans d'anciennté
    if (anneeAncienete >= 1 && anneeAncienete < 2) {
      indemniteCC = indemnite;
      // dans le cas ou il y a un OPE et un licenciement eco
      if (hasOpe && isEco) {
        indemniteCC = salaireRef;
        formula = `${salaireRef}`;
      }
    }
    // le salarié a entre 2 et 10ans d'anciennté
    else if (anneeAncienete >= 2 && anneeAncienete < 10) {
      indemniteCC = ((salaireRef / 10) * 3 * anciennete) / 12;
      formula = `(${salaireRef} / 10) * 3 * (${anciennete} / 12)`;
    }
    // le salarié a entre 10 et 20ans d'anciennté
    else if (anneeAncienete >= 10 && anneeAncienete < 20) {
      indemniteCC = ((salaireRef / 10) * 4 * anciennete) / 12;
      formula = `(${salaireRef} / 10) * 4 * (${anciennete} / 12)`;
    }
    // le salarié a plus de 20ans d'anciennté
    else if (anneeAncienete >= 20) {
      indemniteCC = ((salaireRef / 10) * 5 * anciennete) / 12;
      formula = `(${salaireRef} / 10) * 5 * (${anciennete} / 12)`;
    }
    // Pour les salariés qui ont plus de 5ans d'ancienneté
    if (anneeAncienete >= 5) {
      // le salarié a entre 50 et 55ans
      if (age >= 50 && age < 55) {
        indemniteCC += salaireRef;
        formula += `+ ${salaireRef}`;
        if (hasOpe && isEco) {
          indemniteCC += salaireRef;
          formula += `* 2`;
        }
      }
      // le salarié a entre 50 et 55ans
      else if (age >= 55) {
        indemniteCC += salaireRef * 2;
        formula += `+ ${salaireRef} * 2`;
      }
    }
    // l'indemnité ne peut exéder 18mois de salaire
    if (indemniteCC > salaireRef * 18) {
      indemniteCC = salaireRef * 18;
      formula = `\\min (${salaireRef} * 18, ${formula})`;
    }
  }
  // le salarié appartient au groupe V
  else if (echelon.groupe === "V") {
    // le salarié a entre 1 et 2ans d'anciennté
    if (anneeAncienete >= 1 && anneeAncienete < 2) {
      indemniteCC = indemnite;
      if (hasOpe && isEco) {
        indemniteCC = salaireRef;
        formula = `${salaireRef}`;
      }
    }
    // le salarié a entre 2 et 10ans d'anciennté
    else if (anneeAncienete >= 2 && anneeAncienete < 10) {
      indemniteCC = ((salaireRef / 10) * 4 * anciennete) / 12;
      formula = `(${salaireRef} / 10) * 4 * (${anciennete} / 12)`;
    }
    // le salarié a entre 10 et 15ans d'anciennté
    else if (anneeAncienete >= 10 && anneeAncienete < 15) {
      indemniteCC = ((salaireRef / 10) * 6 * anciennete) / 12;
      formula = `(${salaireRef} / 10) * 6 * (${anciennete} / 12)`;
    }
    // le salarié a plus de 15ans d'anciennté
    else if (anneeAncienete >= 15) {
      indemniteCC = ((salaireRef / 10) * 8 * anciennete) / 12;
      formula = `(${salaireRef} / 10) * 8 * (${anciennete} / 12)`;
    }
    // Pour les salariés qui ont plus de 5ans d'ancienneté
    if (anneeAncienete > 6) {
      // le salarié a entre 45 et 55ans
      if (age >= 45 && age < 55) {
        indemniteCC += salaireRef;
        formula += ` + ${salaireRef}`;
        if (hasOpe && isEco && age >= 50) {
          indemniteCC += salaireRef;
          formula += `* 2`;
        }
      }
      // le salarié a plus de 55ans
      else if (age >= 55) {
        indemniteCC += salaireRef * 2;
        formula += `${salaireRef} * 2`;
      }
    }
    // l'indemnité ne peut exéder 20mois de salaire
    if (indemniteCC > salaireRef * 20) {
      formula = `\\min (${salaireRef} * 20, ${formula})`;
      indemniteCC = salaireRef * 20;
    }
  }

  if (isEco && hasOpe && anneeAncienete >= 2 && indemniteCC < salaireRef * 2) {
    indemniteCC = salaireRef * 2;
    formula = `${salaireRef} * 2`;
  }

  return {
    moyenneSalaires,
    dernierSalaire,
    salaireRef,
    convention,
    anciennete,
    indemnite: indemniteCC,
    age,
    echelon,
    hasOpe,
    isEco,
    formula
  };
}
