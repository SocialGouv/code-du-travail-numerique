import { round, sum } from "../common/utils";

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
}

/**
 * Compute the indemnité calculus
 */
function getIndemniteExplications({
  salaireRef,
  inaptitude = false,
  anciennete,
}) {
  let formula = "-";
  const labels = {
    "Ancienneté totale (A)": round(anciennete),
    "Licenciement pour inaptitude": inaptitude ? "oui" : "non",
    "Salaire de réference (Sref)": round(salaireRef),
    ...(anciennete - 10 > 0 && {
      "Ancienneté au delà de 10ans (A2)": round(anciennete - 10),
    }),
  };

  const isSmallAnciennete = anciennete <= 10; // 10 years
  if (anciennete >= 8 / 12) {
    if (isSmallAnciennete) {
      formula = `1 / 4 * Sref * A`;
    } else {
      formula = `(1 / 4 * Sref * 10) + (1 / 3 * Sref * A2)`;
    }
  }
  if (inaptitude) {
    formula += " * 2";
  }

  return { formula, labels };
}

export { getIndemniteExplications, getSalaireRef };
