export enum TrackingType {
  CONTRIBUTIONS = "contrib",
  MODELES = "courrier",
  OUTILS = "outils",
  DOSSIERS = "dossiers",
  THEMES = "themes",
  LP_CODES = "lpcode",
}

export const URL_TRACKED = [
  {
    type: TrackingType.LP_CODES,
    url: "/",
  },
  {
    type: TrackingType.CONTRIBUTIONS,
    url: "/contribution/les-conges-pour-evenements-familiaux",
  },
  {
    type: TrackingType.CONTRIBUTIONS,
    url: "/contribution/quelle-est-la-duree-du-preavis-en-cas-de-demission",
  },
  {
    type: TrackingType.CONTRIBUTIONS,
    url: "/contribution/quelles-sont-les-consequences-du-non-respect-du-preavis-par-le-salarie-ou-lemployeur",
  },
  {
    type: TrackingType.MODELES,
    url: "/modeles-de-courriers/convocation-a-un-entretien-prealable-au-licenciement-pour-motif-personnel",
  },
  {
    type: TrackingType.MODELES,
    url: "/modeles-de-courriers/rupture-de-periode-dessai-a-linitiative-de-lemployeur",
  },
  {
    type: TrackingType.MODELES,
    url: "/modeles-de-courriers/rupture-dun-commun-accord-dun-contrat-de-travail-a-duree-determinee",
  },
  {
    type: TrackingType.MODELES,
    url: "/modeles-de-courriers/lettre-de-reclamation-des-documents-de-fin-de-contrat",
  },
  {
    type: TrackingType.MODELES,
    url: "/modeles-de-courriers",
  },
  {
    type: TrackingType.MODELES,
    url: "/modeles-de-courriers/rupture-du-contrat-en-periode-dessai-a-linitiative-du-salarie",
  },
  {
    type: TrackingType.OUTILS,
    url: "/outils/simulateur-embauche",
  },
  {
    type: TrackingType.OUTILS,
    url: "/outils/indemnite-licenciement",
  },
  {
    type: TrackingType.OUTILS,
    url: "/outils/convention-collective",
  },
  {
    type: TrackingType.OUTILS,
    url: "/outils/preavis-demission",
  },
  {
    type: TrackingType.OUTILS,
    url: "/outils",
  },
  {
    type: TrackingType.DOSSIERS,
    url: "/dossiers/ministere-du-travail-notre-dossier-sur-le-coronavirus",
  },
  {
    type: TrackingType.DOSSIERS,
    url: "/dossiers/aides-et-accompagnement-embauche-et-perennisation-des-emplois",
  },
  {
    type: TrackingType.THEMES,
    url: "/themes/depart-de-lentreprise",
  },
  {
    type: TrackingType.THEMES,
    url: "/themes/temps-de-travail",
  },
  {
    type: TrackingType.THEMES,
    url: "/themes/embauche-et-contrat-de-travail",
  },
];
