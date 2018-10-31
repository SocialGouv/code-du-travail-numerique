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
  isEco
}) {
  const moyenneSalaires =
    (sum(salaires) + (primes || 0)) / salaires.length || 0;

  const dernierSalaire = salaires.slice(0, 1) + primes / 12;

  const salaireRef = Math.max(moyenneSalaires, dernierSalaire);
  // ancienneté en année
  const a = Math.floor(anciennete / 12);
  let indemniteCC = 0;
  let formula = "";

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
  // l'entreprise n'est pas affilié a une Organisation Patronale Employeur
  if (!hasOpe) {
    // le salarié appartient au groupe I, II, III
    if (contains(["I", "II", "III"], echelon.groupe)) {
      // le salarié a entre 1 et 2ans d'anciennté
      if (a >= 1 && a < 2) {
        indemniteCC = indemnite;
      }
      // le salarié a plus de 2ans d'anciennté
      else if (a >= 2) {
        indemniteCC = (salaireRef / 10) * 3 * a;
        formula = `(${salaireRef} / 10) * 3 * a`;
      }
      // Pour les salarié avec plus de 5ans d'ancienneté
      if (a > 5) {
        // le salarié a entre 50 et 55ans
        if (age > 50 && age <= 55) {
          indemniteCC += salaireRef;
          formula += ` + ${salaireRef}`;
        }
        // le salarié a plus de 55ans
        else if (age > 55) {
          indemniteCC += salaireRef * 2;
          formula += ` + ${salaireRef} * 2`;
        }
      }
      // l'indemnité ne peut exéder 14mois de salaire
      indemniteCC = Math.min(indemniteCC, salaireRef * 14);
      if (indemniteCC > salaireRef * 14) {
        formula = `\\max ${salaireRef} * 14`;
      }
    }
    // le salarié appartient au groupe IV
    else if (contains(["IV"], echelon.groupe)) {
      // le salarié a entre 1 et 2ans d'anciennté
      if (a >= 1 && a < 2) {
        indemniteCC = indemnite;
      }
      // le salarié a entre 2 et 10ans d'anciennté
      else if (a >= 2 && a < 10) {
        indemniteCC = (salaireRef / 10) * 3 * a;
        formula = `(${salaireRef} / 10) * 3 * a`;
      }
      // le salarié a entre 10 et 20ans d'anciennté
      else if (a >= 10 && a < 20) {
        indemniteCC = (salaireRef / 10) * 4 * a;
        formula = `(${salaireRef} / 10) * 4 * a`;
      }
      // le salarié a plus de 20ans d'anciennté
      else if (a >= 20) {
        indemniteCC = (salaireRef / 10) * 5 * a;
        formula = `(${salaireRef} / 10) * 5 * a`;
      }
      // Pour les salariés qui ont plus de 5ans d'ancienneté
      if (a >= 5) {
        // le salarié a entre 50 et 55ans
        if (age >= 50 && age < 55) {
          indemniteCC += salaireRef;
          formula += `+ ${salaireRef}`;
        }
        // le salarié a entre 50 et 55ans
        else if (age > 55) {
          indemniteCC += salaireRef * 2;
          formula += `+ ${salaireRef} * 2`;
        }
      }
      // l'indemnité ne peut exéder 18mois de salaire
      indemniteCC = Math.min(indemniteCC, salaireRef * 18);
      if (indemniteCC > salaireRef * 18) {
        formula = `\\max ${salaireRef} * 18`;
      }
    }
    // le salarié appartient au groupe V
    else if (contains(["V"], echelon.groupe)) {
      // le salarié a entre 1 et 2ans d'anciennté
      if (a >= 1 && a < 2) {
        // Si le licenciement est économique
        if (isEco) {
          indemniteCC = salaireRef;
          formula = `${salaireRef}`;
        }
        // le licenciement n'est pas économique
        else {
          indemniteCC = indemnite;
        }
      }
      // le salarié a entre 2 et 10ans d'anciennté
      else if (a >= 2 && a < 10) {
        indemniteCC = (salaireRef / 10) * 4 * a;
        formula = `(${salaireRef} / 10) * 4 * a`;
      }
      // le salarié a entre 10 et 15ans d'anciennté
      else if (a >= 10 && a < 15) {
        indemniteCC = (salaireRef / 10) * 6 * a;
        formula = `(${salaireRef} / 10) * 6 * a`;
      }
      // le salarié a plus de 15ans d'anciennté
      else if (a >= 15) {
        indemniteCC = (salaireRef / 10) * 8 * a;
        formula = `(${salaireRef} / 10) * 8 * a`;
      }
      // Pour les salariés qui ont plus de 5ans d'ancienneté
      if (a >= 5) {
        // le salarié a entre 45 et 55ans
        if (age > 45 && age < 55) {
          indemniteCC += salaireRef;
          formula += `${salaireRef}`;
          // le salarié a moins 50ans et le licenciement est économique
          if (age > 50 && isEco) {
            indemniteCC += salaireRef;
            formula += `* 2`;
          }
        }
        // le salarié a plus de 55ans
        else if (age > 55) {
          indemniteCC += salaireRef * 2;
          formula += `${salaireRef} * 2`;
        }
      }
      // l'indemnité ne peut exéder 20mois de salaire
      indemniteCC = Math.min(indemniteCC, salaireRef * 20);
      if (indemniteCC > salaireRef * 14) {
        formula = `\\max ${salaireRef} * 20`;
      }
    }
  }
  //l'entreprise est affilié a une OPE
  else {
    indemniteCC += 0;
  }
  return {
    salaireRef,
    indemnite: indemniteCC,
    age,
    echelon,
    hasOpe,
    isEco,
    formula
  };
}
