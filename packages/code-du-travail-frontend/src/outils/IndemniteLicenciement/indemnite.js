import { isAfter } from "date-fns";

import { parse } from "../common/date";
import { round, sum } from "../common/math";

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
  anciennete,
}) {
  try {
    if (!salaires) {
      salaires = [];
    }
    if (!primes) {
      primes = [];
    }
    const primeValues = primes.map((a) => a.prime);
    const salaryValues = salaires.map((a) => a.salary);

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
        : sum(primeValues) / 12 +
          (sum(salaryValues.slice(0, 3)) - sum(primeValues)) / 3;

      return Math.max(moyenneSalaires, moyenne3DerniersMoisSalaires);
    }
  } catch (e) {
    //TODO: handle error
    console.error(e);
    return 0;
  }
}

/**
 * Compute the indemnité calculus
 */
function getIndemnite({
  salaireRef,
  inaptitude = false,
  anciennete,
  dateNotification,
}) {
  const dNotification = parse(dateNotification);
  let formula = "-";
  const labels = {
    "Ancienneté totale (A)": round(anciennete),
    "Licenciement pour inaptitude": inaptitude ? "oui" : "non",
    "Salaire de réference (Sref)": round(salaireRef),
    ...(anciennete - 10 > 0 && {
      "Ancienneté au delà de 10ans (A2)": round(anciennete - 10),
    }),
  };
  const avant27Sep2017 = isAfter(new Date("2017-09-27"), dNotification);

  let indemniteLegale = 0;
  const isSmallAnciennete = anciennete <= 10; // 10 years
  if (avant27Sep2017 && anciennete >= 1) {
    if (isSmallAnciennete) {
      indemniteLegale = (1 / 5) * salaireRef * anciennete;
      formula = `1 / 5 * Sref * A`;
    } else {
      indemniteLegale =
        (1 / 5) * salaireRef * anciennete +
        (2 / 15) * salaireRef * (anciennete - 10);
      formula = `(1 / 5  * Sref * 10) + (2 / 5 * Sref * A2)`;
    }
  } else if (!avant27Sep2017 && anciennete >= 8 / 12) {
    if (isSmallAnciennete) {
      indemniteLegale = (1 / 4) * salaireRef * anciennete;
      formula = `1 / 4 * Sref * A`;
    } else {
      indemniteLegale =
        (1 / 4) * salaireRef * 10 + (1 / 3) * salaireRef * (anciennete - 10);
      formula = `(1 / 4 * Sref * 10) + (1 / 3 * Sref * A2)`;
    }
  }
  if (inaptitude && indemniteLegale > 0) {
    indemniteLegale *= 2;
    formula += " * 2";
  }

  return {
    indemniteLegale: round(indemniteLegale),
    infoCalculLegal: { formula, labels },
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
    dateNotification,
  } = state.values;

  const salaireRef = getSalaireRef({
    anciennete,
    hasSameSalaire,
    hasTempsPartiel,
    primes,
    salaire,
    salairePeriods,
    salaires,
  });

  const { indemniteLegale, infoCalculLegal } = getIndemnite({
    anciennete,
    dateNotification,
    inaptitude,
    salaireRef,
  });

  return {
    indemniteLegale,
    infoCalculLegal,
    salaireRefLegal: salaireRef,
  };
}

export { getIndemnite, getIndemniteFromFinalForm, getSalaireRef, round };
