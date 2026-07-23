import { Contribution } from "./type";
import { Agreement } from "src/modules/outils/indemnite-depart/types";

const CONGES_EVENEMENTS_FAMILIAUX_SLUG = "les-conges-pour-evenements-familiaux";

// Hash ajouté par le formulaire lorsqu'il navigue vers la page CC : il signale
// une arrivée « par action de l'usager » et déclenche le focus sur le titre.
// Sans ce hash (arrivée directe SEO/Google, lien partagé, reload), on ne vole
// pas le focus. Même principe que `#retour` côté page générique.
export const AGREEMENT_FOCUS_HASH = "#votre-convention-collective";

// Hash ajouté lorsqu'une page CC renvoie vers la fiche générique pour afficher
// la réponse « Code du travail » (option « je ne souhaite pas renseigner ma
// CC » ou CC non traitée) : la générique affiche alors directement le contenu
// en gardant le choix de l'usager coché. Correspond à l'id du bloc de contenu.
export const GENERIC_CONTENT_HASH = "#cdt";

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
