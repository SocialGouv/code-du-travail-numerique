/**
 * POC : mise en avant d'une contribution CDTN dans une fiche service-public.
 *
 * Les fiches SP sont un contenu externe (JSON) sur lequel on n'a pas la main :
 * on injecte un bloc « Une réponse plus précise… » à un emplacement donné.
 *
 * Emplacements :
 * - `page` : après l'introduction de la fiche (emplacement par défaut) ;
 * - `accordion` : en deuxième position du contenu du N-ième accordéon (1-based,
 *   dans l'ordre d'affichage des accordéons de premier niveau), c'est-à-dire
 *   après le premier élément qui suit le titre ;
 * - `section` : juste après le titre de la N-ième section de premier niveau
 *   (1-based, titres rendus en h2).
 */
export type ContributionPromoPlacement =
  | { type: "page" }
  | { type: "accordion"; index: number }
  | { type: "section"; index: number };

export type ContributionPromoConfig = {
  spSlug: string;
  contributionSlug: string;
  placement: ContributionPromoPlacement;
};

const page: ContributionPromoPlacement = { type: "page" };
const accordion = (index: number): ContributionPromoPlacement => ({
  type: "accordion",
  index,
});
const section = (index: number): ContributionPromoPlacement => ({
  type: "section",
  index,
});

export const CONTRIBUTION_PROMOS: ContributionPromoConfig[] = [
  {
    spSlug:
      "un-salarie-peut-il-faire-plusieurs-periodes-dessai-chez-le-meme-employeur",
    contributionSlug: "la-periode-dessai-peut-elle-etre-renouvelee",
    placement: page,
  },
  {
    spSlug: "periode-dessai-pour-un-salarie",
    contributionSlug: "la-periode-dessai-peut-elle-etre-renouvelee",
    placement: page,
  },
  {
    spSlug:
      "le-salarie-doit-il-faire-un-preavis-en-cas-de-demission-liee-a-la-mutation-du-conjoint",
    contributionSlug:
      "le-preavis-de-demission-doit-il-etre-execute-en-totalite-y-compris-si-le-salarie-a-retrouve-un-emploi",
    placement: page,
  },
  {
    spSlug: "embauche-en-contrat-dextra-cdd-dusage",
    contributionSlug: "embauche-en-contrat-dextra-cdd-dusage",
    placement: page,
  },
  {
    spSlug:
      "le-salarie-touche-t-il-la-prime-de-precarite-a-la-fin-dun-contrat-de-travail",
    contributionSlug:
      "dans-le-cadre-dun-cdd-quel-est-le-montant-de-lindemnite-de-fin-de-contrat",
    placement: page,
  },
  {
    spSlug: "quest-ce-quun-contrat-de-chantier-ou-doperation",
    contributionSlug:
      "lentreprise-peut-elle-embaucher-dans-le-cadre-dun-cdi-de-chantier-ou-doperation",
    placement: page,
  },
  {
    spSlug:
      "salarie-au-domicile-de-lemployeur-que-faire-en-cas-de-deces-de-lemployeur",
    contributionSlug:
      "quelles-sont-les-consequences-du-deces-de-lemployeur-sur-le-contrat-de-travail",
    placement: page,
  },
  {
    spSlug: "heures-supplementaires-dun-salarie-du-secteur-prive",
    contributionSlug: "heures-supplementaires",
    placement: page,
  },
  {
    spSlug: "preavis-de-licenciement",
    contributionSlug: "quelle-est-la-duree-de-preavis-en-cas-de-licenciement",
    placement: accordion(3),
  },
  {
    spSlug: "renouvellement-dun-contrat-de-travail-a-duree-determinee-cdd",
    contributionSlug: "quelle-peut-etre-la-duree-maximale-dun-cdd",
    placement: page,
  },
  {
    spSlug: "a-quelles-conditions-un-salarie-peut-il-cumuler-plusieurs-emplois",
    contributionSlug: "quelles-sont-les-conditions-de-cumul-demplois",
    placement: page,
  },
  {
    spSlug: "renouvellement-dun-contrat-de-travail-a-duree-determinee-cdd",
    contributionSlug:
      "combien-de-fois-le-contrat-de-travail-peut-il-etre-renouvele",
    placement: accordion(1),
  },
  {
    spSlug: "licenciement-dun-salarie-en-arret-maladie-dans-le-secteur-prive",
    contributionSlug:
      "en-cas-de-maladie-le-salarie-a-t-il-droit-a-une-garantie-demploi",
    placement: page,
  },
  {
    spSlug: "conge-de-maternite-dune-salariee-du-secteur-prive",
    contributionSlug: "quelle-est-la-duree-du-conge-de-maternite",
    placement: accordion(3),
  },
  {
    spSlug: "conge-de-maternite-dune-salariee-du-secteur-prive",
    contributionSlug:
      "quelles-sont-les-conditions-dindemnisation-pendant-le-conge-de-maternite",
    placement: accordion(13),
  },
  {
    spSlug:
      "un-salarie-qui-part-a-la-retraite-a-t-il-droit-a-une-indemnite-de-depart",
    contributionSlug:
      "a-quelles-indemnites-peut-pretendre-un-salarie-qui-part-a-la-retraite",
    placement: page,
  },
  {
    spSlug:
      "un-salarie-peut-il-reporter-des-jours-de-conges-payes-pour-cause-de-maladie",
    contributionSlug:
      "si-le-salarie-est-malade-pendant-ses-conges-quelles-en-sont-les-consequences",
    placement: page,
  },
  {
    spSlug: "arret-maladie-pendant-le-preavis-quelles-consequences",
    contributionSlug: "arret-maladie-pendant-le-preavis-quelles-consequences",
    placement: section(2),
  },
  {
    spSlug: "arret-maladie-indemnites-journalieres-versees-au-salarie",
    contributionSlug:
      "en-cas-darret-maladie-du-salarie-lemployeur-doit-il-assurer-le-maintien-de-salaire",
    placement: page,
  },
  {
    spSlug:
      "maladie-professionnelle-indemnites-journalieres-pendant-larret-de-travail",
    contributionSlug:
      "en-cas-darret-maladie-du-salarie-lemployeur-doit-il-assurer-le-maintien-de-salaire",
    placement: page,
  },
  {
    spSlug:
      "accident-du-travail-indemnites-journalieres-pendant-larret-de-travail",
    contributionSlug:
      "en-cas-darret-maladie-du-salarie-lemployeur-doit-il-assurer-le-maintien-de-salaire",
    placement: page,
  },
  {
    spSlug: "arret-maladie-pendant-la-periode-dessai-quelles-sont-les-regles",
    contributionSlug:
      "arret-maladie-pendant-la-periode-dessai-quelles-sont-les-regles",
    placement: page,
  },
  {
    spSlug: "quest-ce-quune-clause-de-non-concurrence",
    contributionSlug:
      "quelles-sont-les-conditions-de-la-clause-de-non-concurrence",
    placement: page,
  },
  {
    spSlug: "preavis-de-licenciement",
    contributionSlug:
      "le-preavis-de-licenciement-doit-il-etre-execute-en-totalite-y-compris-si-le-salarie-a-retrouve-un-emploi",
    placement: accordion(1),
  },
  {
    spSlug:
      "un-salarie-a-t-il-des-heures-de-recherche-demploi-pendant-le-preavis-de-licenciement",
    contributionSlug:
      "le-salarie-peut-il-sabsenter-pour-rechercher-un-emploi-pendant-son-preavis",
    placement: page,
  },
  {
    spSlug:
      "salaire-du-secteur-prive-la-prime-danciennete-est-elle-obligatoire",
    contributionSlug:
      "quand-le-salarie-a-t-il-droit-a-une-prime-danciennete-quel-est-son-montant",
    placement: page,
  },
  {
    spSlug: "travail-le-dimanche-dun-salarie-du-secteur-prive",
    contributionSlug: "travail-du-dimanche-quelle-contrepartie",
    placement: accordion(2),
  },
  {
    spSlug: "le-contrat-de-travail-est-il-obligatoirement-ecrit",
    contributionSlug:
      "est-il-obligatoire-davoir-un-contrat-de-travail-ecrit-et-signe",
    placement: page,
  },
  {
    spSlug:
      "quelle-est-la-duree-de-la-periode-dessai-dun-contrat-de-mission-interim",
    contributionSlug:
      "quelle-est-la-duree-maximale-de-la-periode-dessai-sans-et-avec-renouvellement",
    placement: page,
  },
  {
    spSlug: "contrat-de-travail-temporaire-ou-contrat-dit-dinterim",
    contributionSlug:
      "quelle-est-la-duree-maximale-du-contrat-de-mission-interim",
    placement: accordion(5),
  },
];

export const getContributionPromos = (
  spSlug: string
): ContributionPromoConfig[] =>
  CONTRIBUTION_PROMOS.filter((promo) => promo.spSlug === spSlug);
