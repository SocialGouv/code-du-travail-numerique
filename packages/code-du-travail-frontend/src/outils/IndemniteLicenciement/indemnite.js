import { round, sum } from "../common/utils";

function getTotalPrimes({ primes = [] }) {
  return sum(primes.map((a) => a.prime));
}

/**
 * Compute the salaire de Réference
 * used in the indemnité calculus
 */
function getSalaireRef({
  hasSameSalaire = false,
  salaires = [],
  salaire,
  primes = [],
}) {
  if (!salaires) {
    salaires = [];
  }
  if (!primes) {
    primes = [];
  }
  const primeValues = primes.map((a) => a.prime);
  const salaryValues = salaires.map((a) => a.salary);

  const moyenneSalaires = hasSameSalaire
    ? salaire
    : sum(salaryValues) / salaires.length;

  const moyenne3DerniersMoisSalaires = hasSameSalaire
    ? salaire
    : sum(primeValues) / 12 +
      (sum(salaryValues.slice(0, 3)) - sum(primeValues)) / 3;

  return Math.max(moyenneSalaires, moyenne3DerniersMoisSalaires);
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

export { getIndemniteExplications, getSalaireRef, getTotalPrimes };
