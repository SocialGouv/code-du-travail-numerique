// mapping elastic search source type -> route name
const routeBySource = {
  faq: "question",
  code_bfc: "fiche-code-bfc",
  fiches_service_public: "fiche-service-public",
  fiches_ministere_travail: "fiche-ministere-travail",
  code_du_travail: "code-du-travail",
  conventions_collectives: "convention-collective"
};

// mapping elastic search source type -> source label
const labelBySource = {
  faq: "FAQ",
  code_bfc: "DIRECCTE Bourgogne-Franche-Comté",
  fiches_service_public: "Service Public",
  fiches_ministere_travail: "Ministère du Travail",
  code_du_travail: "Legifrance",
  conventions_collectives: "Legifrance"
};

export const getLabelBySource = src => labelBySource[src] || "";
export const getRouteBySource = src => routeBySource[src];
