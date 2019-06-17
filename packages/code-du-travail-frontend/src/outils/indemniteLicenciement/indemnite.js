import { isAfter } from "date-fns";
import { round, sum } from "./math";
/**
 * Compute the salaire de Réference
 * used in the indemnité calculus
 */
function getSalaireRef({
  hasTempsPartiel = false,
  hasSameSalaire = false,
  salaires = [],
  salaire,
  salairePeriods,
  primes = [],
  anciennete
}) {
  const primeValues = primes.map(a => a.prime);
  const salaryValues = salaires.map(a => a.salary);

  let moyenneSalaires = 0;
  let moyenne3DerniersMoisSalaires = 0;

  // calcul du salaire de reference
  if (hasTempsPartiel) {
    return salairePeriods.reduce(
      (salaire, period) =>
        salaire +
        (parseInt(period.salary, 10) * parseInt(period.duration, 10)) /
          12 /
          anciennete,
      0
    );
  } else {
    moyenneSalaires = hasSameSalaire
      ? salaire
      : sum(salaryValues) / salaires.length;

    moyenne3DerniersMoisSalaires = hasSameSalaire
      ? salaire
      : (sum(salaryValues.slice(0, 3)) -
          sum(primeValues) +
          sum(primeValues) / 12) /
        3;
    return Math.max(moyenneSalaires, moyenne3DerniersMoisSalaires);
  }
}

/**
 * Compute the indemnité calculus
 */
function getIndemnite({
  salaireRef,
  inaptitude = false,
  anciennete,
  dateNotification
}) {
  let formula;

  const avant27Sep2017 = isAfter(new Date("2017-09-27"), dateNotification);

  let indemnite = 0;
  const isSmallAnciennete = anciennete <= 10; // 10 years
  if (avant27Sep2017 && anciennete >= 1) {
    if (isSmallAnciennete) {
      indemnite = (1 / 5) * salaireRef * anciennete;
      formula = `(1/5 * ${round(salaireRef)} * ${anciennete}) / 12`;
    } else {
      indemnite =
        (1 / 5) * salaireRef * anciennete +
        (2 / 15) * salaireRef * (anciennete - 10);
      formula = `(1/5  * ${round(salaireRef)} * 10) + (2/5 * ${round(
        salaireRef
      )} * (${round(anciennete)} - 10))`;
    }
  } else if (!avant27Sep2017 && anciennete >= 8 / 12) {
    if (isSmallAnciennete) {
      indemnite = (1 / 4) * salaireRef * anciennete;
      formula = `(1/4 * ${round(salaireRef)} * ${anciennete}) / 12`;
    } else {
      indemnite =
        (1 / 4) * salaireRef * 10 + (1 / 3) * salaireRef * (anciennete - 10);
      formula = `(1/4 * ${round(salaireRef)} * 10) + (1/3 * ${round(
        salaireRef
      )} * (${round(anciennete)} - 10))`;
    }
  }
  if (inaptitude && indemnite > 0) {
    indemnite *= 2;
    formula += "* 2";
  }

  return {
    indemnite: round(indemnite),
    formula
  };
}

function getIndemniteFromFinalForm(form) {
  const state = form.getState();
  const {
    hasTempsPartiel = false,
    hasSameSalaire = false,
    inaptitude = false,
    salairePeriods = [],
    salaires = [],
    primes = [],
    salaire,
    anciennete,
    dateNotification
  } = state.values;

  const salaireRef = getSalaireRef({
    hasTempsPartiel,
    hasSameSalaire,
    salaire,
    salairePeriods,
    salaires,
    anciennete,
    primes
  });

  return getIndemnite({
    salaireRef,
    inaptitude,
    anciennete,
    dateNotification
  });
}

export { getIndemnite, getSalaireRef, getIndemniteFromFinalForm, round };
