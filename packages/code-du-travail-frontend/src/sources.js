// mapping elastic search source type -> route name
const routeBySource = {
  faq: "question",
  code_bfc: "fiche-code-bfc",
  fiches_service_public: "fiche-service-public",
  fiches_ministere_travail: "fiche-ministere-travail",
  code_du_travail: "code-du-travail",
  conventions_collectives: "convention-collective",
  modeles_de_courriers: "modeles-de-courriers",
  themes: "themes",
  outils: "outils",
  idcc: "idcc",
  kali: "kali"
};

// mapping elastic search source type -> source label
const labelBySource = {
  faq: "FAQ",
  code_bfc: "DIRECCTE Bourgogne-Franche-Comté",
  fiches_service_public: "Service Public",
  fiches_ministere_travail: "Ministère du Travail",
  code_du_travail: "Code du travail",
  conventions_collectives: "Legifrance",
  modeles_de_courriers: "Courrier Type",
  themes: "themes",
  outils: "outils",
  idcc: "Legifrance",
  kali: "Legifrance"
};

export const getLabelBySource = src => labelBySource[src] || "";
export const getRouteBySource = src => routeBySource[src];

const sources = Object.keys(routeBySource);
export const getExcludeSources = value => {
  if (Boolean(value) === false) return "";
  return sources.filter(source => source.startsWith(value) === false).join(",");
};
