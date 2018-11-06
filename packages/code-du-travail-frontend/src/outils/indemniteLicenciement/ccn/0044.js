import { Age } from "../Age";
import { AffiliationOpe } from "./AffilationOpe";
import { EchelonChimie } from "./EchelonChimie";
import { LicenciementEco } from "./licenciementEco";

export const steps = [
  { component: AffiliationOpe, key: "hasOpe" },
  { component: EchelonChimie, key: "echelon" },
  { component: Age, key: "age" },
  { component: LicenciementEco, key: "isEco" }
];
export const initialData = {
  hasOpe: false,
  isEco: false
};

const sum = arr => arr.reduce((sum, c) => sum + parseFloat(c), 0);
const contains = (arr, value) => arr.indexOf(value) !== -1;

export function getIndeminiteCC({
  salaires,
  primes,
  anciennete,
  indemnite,
  age,
  hasOpe,
  echelon,
  isEco,
  convention
}) {
  if (!echelon || !age) {
    return {
      errors: [
        {
          type: "warning",
          text: "missing data"
        }
      ]
    };
  }

  const moyenneSalaires =
    (sum(salaires) + (primes || 0)) / salaires.length || 0;

  let dernierSalaire = salaires[0] + primes / 12;

  // Pour le groupe V on prend le dernier salaire avant préavis (8ieme mois, donc 4ieme en partant de la fin )
  if (contains(["V"], echelon.groupe)) {
    dernierSalaire = salaires[4];
  }
  const salaireRef = Math.max(moyenneSalaires, dernierSalaire);
  // ancienneté en année
  const a = Math.floor(anciennete / 12);
  let indemniteCC = 0;
  let formula = "";

  // l'entreprise n'est pas affilié a une Organisation Patronale Employeur

  // le salarié appartient au groupe I, II, III
  if (contains(["I", "II", "III"], echelon.groupe)) {
    // le salarié a entre 1 et 2ans d'anciennté
    if (a >= 1 && a < 2) {
      indemniteCC = indemnite;
      // dans le cas ou il y a un OPE et un licenciement eco
      if (hasOpe && isEco) {
        indemniteCC = salaireRef;
        formula = `${salaireRef}`;
      }
    }
    // le salarié a plus de 2ans d'anciennté
    else if (a >= 2) {
      indemniteCC = (salaireRef / 10) * 3 * a;
      formula = `(${salaireRef} / 10) * 3 * ${a}`;
    }
    // Pour les salarié avec plus de 5ans d'ancienneté
    if (a >= 5) {
      // le salarié a entre 50 et 55ans
      if (age > 50 && age <= 55) {
        indemniteCC += salaireRef;
        formula += ` + ${salaireRef}`;
        if (isEco && hasOpe) {
          indemniteCC += salaireRef;
          formula += ` * 2`;
        }
      }
      // le salarié a plus de 55ans
      else if (age > 55) {
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
    if (a >= 1 && a < 2) {
      indemniteCC = indemnite;
      // dans le cas ou il y a un OPE et un licenciement eco
      if (hasOpe && isEco) {
        indemniteCC = salaireRef;
        formula = `${salaireRef}`;
      }
    }
    // le salarié a entre 2 et 10ans d'anciennté
    else if (a >= 2 && a < 10) {
      indemniteCC = (salaireRef / 10) * 3 * a;
      formula = `(${salaireRef} / 10) * 3 * ${a}`;
    }
    // le salarié a entre 10 et 20ans d'anciennté
    else if (a >= 10 && a < 20) {
      indemniteCC = (salaireRef / 10) * 4 * a;
      formula = `(${salaireRef} / 10) * 4 * ${a}`;
    }
    // le salarié a plus de 20ans d'anciennté
    else if (a >= 20) {
      indemniteCC = (salaireRef / 10) * 5 * a;
      formula = `(${salaireRef} / 10) * 5 * ${a}`;
    }
    // Pour les salariés qui ont plus de 5ans d'ancienneté
    if (a >= 5) {
      // le salarié a entre 50 et 55ans
      if (age >= 50 && age < 55) {
        indemniteCC += salaireRef;
        formula += `+ ${salaireRef}`;
        if (hasOpe && isEco) {
          indemniteCC += salaireRef;
          formula = `* 2`;
        }
      }
      // le salarié a entre 50 et 55ans
      else if (age > 55) {
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
    if (a >= 1 && a < 2) {
      indemniteCC = indemnite;
    }
    // le salarié a entre 2 et 10ans d'anciennté
    else if (a >= 2 && a < 10) {
      indemniteCC = (salaireRef / 10) * 4 * a;
      formula = `(${salaireRef} / 10) * 4 * ${a}`;
    }
    // le salarié a entre 10 et 15ans d'anciennté
    else if (a >= 10 && a < 15) {
      indemniteCC = (salaireRef / 10) * 6 * a;
      formula = `(${salaireRef} / 10) * 6 * ${a}`;
    }
    // le salarié a plus de 15ans d'anciennté
    else if (a >= 15) {
      indemniteCC = (salaireRef / 10) * 8 * a;
      formula = `(${salaireRef} / 10) * 8 * ${a}`;
    }
    // Pour les salariés qui ont plus de 5ans d'ancienneté
    if (a > 6) {
      // le salarié a entre 45 et 55ans
      if (age >= 45 && age < 55) {
        indemniteCC += salaireRef;
        formula += ` + ${salaireRef}`;
        if (hasOpe && isEco && age >= 50) {
          indemniteCC += salaireRef;
          formula = `* 2`;
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

  if (isEco && hasOpe && indemniteCC < salaireRef * 2) {
    indemniteCC = salaireRef * 2;
    formula = `${salaireRef} * 2`;
  }

  return {
    moyenneSalaires,
    dernierSalaire,
    salaireRef,
    convention,
    anciennete: a,
    indemnite: indemniteCC,
    age,
    echelon,
    hasOpe,
    isEco,
    formula
  };
}
