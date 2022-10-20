type TrackingType =
  | "lpcode"
  | "contrib"
  | "courrier"
  | "outils"
  | "infos"
  | "convention_collective";
type UrlTracked = { type: TrackingType; url: string }[];

export const URL_TRACKED: UrlTracked = [
  {
    type: "lpcode",
    url: "/",
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
    type: "courrier",
    url: "/modeles-de-courriers/lettre-de-demission",
  },
  {
    type: "courrier",
    url: "/modeles-de-courriers/rupture-du-contrat-en-periode-dessai-a-linitiative-du-salarie",
  },
  {
    type: "courrier",
    url: "/modeles-de-courriers/rupture-de-periode-dessai-a-linitiative-de-lemployeur",
  },
  {
    type: "courrier",
    url: "/modeles-de-courriers/convocation-a-un-entretien-prealable-au-licenciement-pour-motif-personnel",
  },
  {
    type: "courrier",
    url: "/modeles-de-courriers/rupture-dun-commun-accord-dun-contrat-de-travail-a-duree-determinee",
  },
  {
    type: "courrier",
    url: "/modeles-de-courriers/lettre-de-reclamation-des-documents-de-fin-de-contrat",
  },
  {
    type: "contrib",
    url: "/contribution/quelle-est-la-duree-du-preavis-en-cas-de-demission",
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
    url: "/contribution/quelles-sont-les-consequences-du-non-respect-du-preavis-par-le-salarie-ou-lemployeur",
  },
  {
    type: "infos",
    url: "/information/la-prime-de-partage-de-la-valeur-infographie",
  },
  {
    type: "infos",
    url: "/information/suivi-medical-et-accompagnement-de-certains-salaries",
  },
  {
    type: "convention_collective",
    url: "/convention-collective/1090-services-de-lautomobile-commerce-et-reparation-de-lautomobile-du-cycle",
  },
  {
    type: "convention_collective",
    url: "/convention-collective/3239-particuliers-employeurs-et-emploi-a-domicile",
  },
];
