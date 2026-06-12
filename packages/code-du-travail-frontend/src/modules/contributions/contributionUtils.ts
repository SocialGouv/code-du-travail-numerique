import { Contribution } from "./type";
import { Agreement } from "src/modules/outils/indemnite-depart/types";

const CONGES_EVENEMENTS_FAMILIAUX_SLUG = "les-conges-pour-evenements-familiaux";

/**
 * Construit l'URL de la page contribution spécifique à une convention
 * collective. La contribution « congés pour événements familiaux » utilise une
 * arborescence par slug/num, les autres le préfixe `${num}-${slug}`.
 * Le hash de focus éventuel est ajouté par l'appelant.
 */
export const buildContributionAgreementPath = (
  slug: string,
  agreement: Pick<Agreement, "slug" | "num">
) =>
  slug === CONGES_EVENEMENTS_FAMILIAUX_SLUG
    ? `/contribution/${slug}/${agreement.slug || agreement.num}`
    : `/contribution/${agreement.num}-${slug}`;

export const isAgreementSupported = (
  contribution: Contribution,
  agreement: Agreement
) => {
  const { ccSupported = [] } = contribution;
  return ccSupported.includes(agreement.id);
};
export const isAgreementUnextended = (
  contribution: Contribution,
  agreement: Agreement
) => {
  const { ccUnextended = [] } = contribution;
  return ccUnextended.includes(agreement?.id);
};
export const isAgreementValid = (
  contribution: Contribution,
  agreement?: Agreement
) => {
  if (!agreement) return false;
  const isSupported = isAgreementSupported(contribution, agreement);
  const isUnextended = isAgreementUnextended(contribution, agreement);
  return !isUnextended && isSupported;
};
