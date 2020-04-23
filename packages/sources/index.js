const SOURCES = {
  CCN: "conventions_collectives",
  CCN_PAGE: "page_convention_collective",
  CDT: "code_du_travail",
  CONTRIBUTIONS: "contributions",
  EXTERNALS: "external",
  IDCC: "idcc",
  LABOUR_LAW: "droit_du_travail",
  LETTERS: "modeles_de_courriers",
  SHEET_MT: "fiches_ministere_travail",
  SHEET_MT_PAGE: "page_fiche_ministere_travail",
  SHEET_SP: "fiches_service_public",
  THEMES: "themes",
  TOOLS: "outils",
  THEMATIC_FILES: "dossiers",
  HIGHLIGHTS: "highlights",
  GLOSSARY: "glossary",
  PREQUALIFIED: "prequalified",
  VERSIONS: "versions",
};

// mapping elastic search source type -> route name
const routeBySource = {
  [SOURCES.CCN]: "convention-collective",
  [SOURCES.CCN_PAGE]: "page-convention-collective",
  [SOURCES.CDT]: "code-du-travail",
  [SOURCES.CONTRIBUTIONS]: "contribution",
  [SOURCES.EXTERNALS]: "external",
  [SOURCES.IDCC]: "idcc",
  [SOURCES.LABOUR_LAW]: "droit-du-travail",
  [SOURCES.LETTERS]: "modeles-de-courriers",
  [SOURCES.SHEET_MT]: "fiche-ministere-travail",
  [SOURCES.SHEET_MT_PAGE]: "page-fiche-ministere-travail",
  [SOURCES.SHEET_SP]: "fiche-service-public",
  [SOURCES.THEMES]: "themes",
  [SOURCES.TOOLS]: "outils",
  [SOURCES.THEMATIC_FILES]: "dossiers",
};

// mapping elastic search source type -> source label
const labelBySource = {
  [SOURCES.CCN]: "Legifrance",
  [SOURCES.CDT]: "Code du travail",
  [SOURCES.CONTRIBUTIONS]: "Contributions",
  [SOURCES.EXTERNALS]: "Outils externes",
  [SOURCES.IDCC]: "Legifrance",
  [SOURCES.LABOUR_LAW]: "Le droit du travail",
  [SOURCES.LETTERS]: "Modèles de documents",
  [SOURCES.SHEET_SP]: "service-public.fr",
  [SOURCES.SHEET_MT]: "Ministère du Travail",
  [SOURCES.THEMES]: "Themes",
  [SOURCES.TOOLS]: "Outils",
  [SOURCES.THEMATIC_FILES]: "Dossiers",
};

const sources = Object.values(SOURCES);

// code_du_travail -> Code du travail
const getLabelBySource = (src) => labelBySource[src];

// code_du_travail -> code-du-travail
const getRouteBySource = (src) => routeBySource[src];

// code-du-travail -> code_du_travail
const getSourceByRoute = (slug) =>
  sources.find((key) => routeBySource[key] === slug);

module.exports = {
  SOURCES,
  getLabelBySource,
  getRouteBySource,
  getSourceByRoute,
};
