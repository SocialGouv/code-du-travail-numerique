import type { Period } from "./types";

/**
 * Espaces que l'on peut trouver dans un montant : l'espace ordinaire, l'espace
 * insécable (U+00A0) que produit `Intl.NumberFormat` en `fr-FR` selon les
 * runtimes, et l'espace fine insécable (U+202F) qu'il produit sur les runtimes
 * récents. Un copier-coller d'un montant formaté doit pouvoir être re-saisi.
 */
const SPACES = /[\s  ]/g;

/** Un montant valide : des chiffres, éventuellement deux décimales. */
const VALID_AMOUNT = /^\d+(?:\.\d{1,2})?$/;

/**
 * Lit un montant saisi en français.
 *
 * Renvoie `null` — et non `NaN` ni `0` — dès que la saisie n'est pas un montant
 * exploitable : c'est ce `null` qui, en amont, vide les résultats et coupe les
 * appels API plutôt que d'envoyer une valeur douteuse à l'URSSAF.
 */
export const parseFrenchAmount = (raw: string): number | null => {
  const cleaned = raw.replace(SPACES, "").replace(/€/g, "").replace(",", ".");

  if (!VALID_AMOUNT.test(cleaned)) {
    return null;
  }

  const value = Number(cleaned);
  return Number.isFinite(value) ? value : null;
};

const AMOUNT_FORMATTER = new Intl.NumberFormat("fr-FR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/**
 * Formate un montant pour l'affichage dans un champ éditable.
 *
 * Sans le symbole « € », porté par le suffixe visuel du champ : `formatCurrency`
 * du dépôt colle le symbole dans la valeur, ce qui est inutilisable ici — la
 * valeur doit pouvoir être ré-éditée telle quelle.
 */
export const formatAmount = (amount: number | null | undefined): string =>
  amount == null || !Number.isFinite(amount)
    ? ""
    : AMOUNT_FORMATTER.format(amount);

const PERCENT_FORMATTER = new Intl.NumberFormat("fr-FR", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export const formatPercentage = (rate: number | null | undefined): string =>
  rate == null || !Number.isFinite(rate)
    ? ""
    : `${PERCENT_FORMATTER.format(rate)} %`;

/** Arrondi à deux décimales — l'API renvoie la pleine précision (`2253.9028125`). */
export const roundToCents = (value: number): number =>
  Math.round(value * 100) / 100;

const MONTHS_PER_YEAR = 12;

/**
 * Ramène un montant saisi dans la période affichée vers le €/mois canonique.
 *
 * Purement présentationnel : c'est le `seed` mensuel qui part à l'API, laquelle
 * se charge ensuite de rendre les résultats dans l'unité voulue.
 */
export const toMonthlyAmount = (amount: number, period: Period): number =>
  period === "annee" ? amount / MONTHS_PER_YEAR : amount;

export const fromMonthlyAmount = (
  amountMonthly: number,
  period: Period
): number =>
  period === "annee" ? amountMonthly * MONTHS_PER_YEAR : amountMonthly;
