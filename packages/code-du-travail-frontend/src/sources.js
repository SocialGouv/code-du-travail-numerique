// mapping elastic search source type -> route name
const routeBySource = {
  faq: "question",
  fiches_service_public: "fiche-service-public",
  fiches_ministere_travail: "fiche-ministere-travail",
  code_du_travail: "code-du-travail",
  modeles_de_courriers: "modeles-de-courriers",
  themes: "themes",
  outils: "outils",
  idcc: "idcc",
  conventions_collectives: "convention-collective"
};

// mapping elastic search source type -> source label
const labelBySource = {
  faq: "Réponses",
  fiches_service_public: "Service Public",
  fiches_ministere_travail: "Ministère du Travail",
  code_du_travail: "Code du travail",
  modeles_de_courriers: "Courrier Type",
  themes: "Themes",
  outils: "Outils",
  idcc: "Legifrance",
  conventions_collectives: "Legifrance",
  fiches: "Fiches"
};

export const getLabelBySource = src => labelBySource[src] || "";
export const getRouteBySource = src => routeBySource[src];

const sources = Object.keys(routeBySource);
export const getExcludeSources = value => {
  if (Boolean(value) === false) return "";
  return sources.filter(source => source.startsWith(value) === false).join(",");
};
