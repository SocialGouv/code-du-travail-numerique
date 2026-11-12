import { Contribution } from "./type";
import { Agreement } from "src/modules/outils/indemnite-depart/types";

// Contributions dont les pages CC sont servies sous
// `/contribution/<slug>/<idcc>-<slug-cc>` au lieu de `/contribution/<idcc>-<slug>`.
// Seule source de vérité de ce format : routes, liens et fil d'Ariane s'appuient
// dessus.
//
// La généralisation est suspendue (#7518) : le changement d'URL des congés pour
// événements familiaux a coûté une part importante de son trafic. N'ajouter une
// contribution ici qu'après avoir appliqué la checklist SEO de changement d'URL
// (#7519, BEST_PRACTICE.md) : redirections 301 en un seul saut, sitemap, liens
// internes, Search Console.
export const CONTRIBUTIONS_WITH_AGREEMENT_SUBPATH: readonly string[] = [
  "les-conges-pour-evenements-familiaux",
];

export const hasAgreementSubpath = (slug?: string) =>
  !!slug && CONTRIBUTIONS_WITH_AGREEMENT_SUBPATH.includes(slug);

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
 * collective. Les contributions de `CONTRIBUTIONS_WITH_AGREEMENT_SUBPATH`
 * utilisent une arborescence par slug/num, les autres le préfixe
 * `${num}-${slug}`. Le hash de focus éventuel est ajouté par l'appelant.
 */
export const buildContributionAgreementPath = (
  slug: string,
  agreement: Pick<Agreement, "slug" | "num">
) =>
  hasAgreementSubpath(slug)
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

// Paramètre de query string portant l'entreprise saisie dans le bloc « Une
// réponse plus précise… » d'une fiche service-public. À l'arrivée sur la fiche
// générique, le parcours « Je cherche mon entreprise » est pré-coché, le champ
// prérempli et la recherche lancée (cf. ContributionGeneric).
export const ENTERPRISE_SEARCH_PARAM = "entreprise";

export const buildContributionEnterprisePath = (
  slug: string,
  enterprise?: string
) => {
  const base = `/contribution/${slug}`;
  const query = enterprise?.trim();
  if (!query) return base;
  return `${base}?${new URLSearchParams({ [ENTERPRISE_SEARCH_PARAM]: query })}`;
};

/** Entreprise passée en query string, ou `undefined`. Côté client uniquement. */
export const getEnterpriseSearchFromLocation = (): string | undefined => {
  if (typeof window === "undefined") return undefined;
  const value = new URLSearchParams(window.location.search)
    .get(ENTERPRISE_SEARCH_PARAM)
    ?.trim();
  return value || undefined;
};
