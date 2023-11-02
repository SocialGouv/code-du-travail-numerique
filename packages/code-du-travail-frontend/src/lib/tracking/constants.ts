type TrackingType =
  | "contrib"
  | "courrier"
  | "outils"
  | "infos"
  | "convention_collective"
  | "lpcode";
type UrlTracked = { type: TrackingType; url: string }[];

export const URL_TRACKED: UrlTracked = [
  {
    type: "lpcode",
    url: "/",
  },
  {
    type: "outils",
    url: "/outils",
  },
  {
    type: "outils",
    url: "/outils/simulateur-embauche",
  },
  {
    type: "outils",
    url: "/outils/indemnite-licenciement",
  },
  {
    type: "outils",
    url: "/outils/convention-collective",
  },
  {
    type: "outils",
    url: "/outils/preavis-demission",
  },
  {
    type: "outils",
    url: "/outils/indemnite-precarite",
  },
  {
    type: "outils",
    url: "/outils/procedure-licenciement",
  },
  {
    type: "courrier",
    url: "/modeles-de-courriers",
  },
  {
    type: "courrier",
    url: "/modeles-de-courriers/lettre-de-demission",
  },
  {
    type: "courrier",
    url: "/modeles-de-courriers/rupture-du-contrat-en-periode-dessai-par-le-salarie",
  },
  {
    type: "courrier",
    url: "/modeles-de-courriers/rupture-de-periode-dessai-par-lemployeur",
  },
  {
    type: "courrier",
    url: "/modeles-de-courriers/convocation-a-un-entretien-prealable-au-licenciement-pour-motif-personnel",
  },
  {
    type: "courrier",
    url: "/modeles-de-courriers/rupture-dun-contrat-de-travail-a-duree-determinee-dun-commun-accord",
  },
  {
    type: "courrier",
    url: "/modeles-de-courriers/promesse-dembauche",
  },
  {
    type: "courrier",
    url: "/modeles-de-courriers/attestation-de-travail",
  },
  {
    type: "contrib",
    url: "/contribution/les-conges-pour-evenements-familiaux",
  },
  {
    type: "contrib",
    url: "/contribution/en-cas-darret-maladie-du-salarie-lemployeur-doit-il-assurer-le-maintien-de-salaire",
  },
  {
    type: "contrib",
    url: "/contribution/est-il-obligatoire-davoir-un-contrat-de-travail-ecrit-et-signe",
  },
  {
    type: "contrib",
    url: "/contribution/quand-le-salarie-a-t-il-droit-a-une-prime-danciennete-quel-est-son-montant",
  },
  {
    type: "contrib",
    url: "/contribution/quelle-est-la-duree-de-preavis-en-cas-de-depart-a-la-retraite",
  },
  {
    type: "contrib",
    url: "/contribution/jours-feries-et-ponts-dans-le-secteur-prive",
  },
  {
    type: "infos",
    url: "/information/rupture-conventionnelle-individuelle-la-procedure-en-details",
  },
  {
    type: "infos",
    url: "/information/suivi-medical-et-accompagnement-de-certains-salaries",
  },
  {
    type: "infos",
    url: "/information/licenciement-pour-inaptitude-medicale",
  },
  {
    type: "infos",
    url: "/information/licenciement-pour-motif-disciplinaire",
  },
  {
    type: "infos",
    url: "/information/licenciement-pour-motif-non-disciplinaire",
  },
  {
    type: "convention_collective",
    url: "/convention-collective/1090-services-de-lautomobile-commerce-et-reparation-de-lautomobile-du-cycle",
  },
  {
    type: "convention_collective",
    url: "/convention-collective/3239-particuliers-employeurs-et-emploi-a-domicile",
  },
  {
    type: "convention_collective",
    url: "/convention-collective/573-commerces-de-gros",
  },
];
