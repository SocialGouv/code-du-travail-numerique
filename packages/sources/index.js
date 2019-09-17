const SOURCES = {
  CCN: "conventions_collectives",
  CDT: "code_du_travail",
  SHEET_SP: "fiches_service_public",
  SHEET_MT: "fiches_ministere_travail",
  THEMES: "themes",
  TOOLS: "outils",
  LETTERS: "modeles_de_courriers",
  FAQ: "faq",
  IDCC: "idcc",
  SHEET: "fiches",
  EXTERNALS: "external"
};

// mapping elastic search source type -> route name
const routeBySource = {
  [SOURCES.FAQ]: "question",
  [SOURCES.SHEET_SP]: "fiche-service-public",
  [SOURCES.SHEET_MT]: "fiche-ministere-travail",
  [SOURCES.CDT]: "code-du-travail",
  [SOURCES.LETTERS]: "modeles-de-courriers",
  [SOURCES.THEMES]: "themes",
  [SOURCES.TOOLS]: "outils",
  [SOURCES.IDCC]: "idcc",
  [SOURCES.CCN]: "convention-collective",
  [SOURCES.EXTERNALS]: "external"
};

// mapping elastic search source type -> source label
const labelBySource = {
  [SOURCES.FAQ]: "Réponses",
  [SOURCES.SHEET_SP]: "service-public.fr",
  [SOURCES.SHEET_MT]: "Ministère du Travail",
  [SOURCES.CDT]: "Code du travail",
  [SOURCES.LETTERS]: "Courrier Type",
  [SOURCES.THEMES]: "Themes",
  [SOURCES.TOOLS]: "Outils",
  [SOURCES.IDCC]: "Legifrance",
  [SOURCES.CCN]: "Legifrance",
  [SOURCES.EXTERNALS]: "Lien externe",
  [SOURCES.SHEET]: "Fiches"
};

const sources = Object.values(SOURCES);

// code_du_travail -> Code du travail
const getLabelBySource = src => labelBySource[src] || "";

// code_du_travail -> code-du-travail
const getRouteBySource = src => routeBySource[src];

// code-du-travail -> code_du_travail
const getSourceByRoute = slug =>
  sources.find(key => routeBySource[key] === slug);

module.exports = {
  SOURCES,
  getLabelBySource,
  getRouteBySource,
  getSourceByRoute
};
