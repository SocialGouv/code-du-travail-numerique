/** @type {cdtnSources.SOURCES} */
const SOURCES = {
  CCN: "conventions_collectives",
  CCN_PAGE: "page_convention_collective",
  CDT: "code_du_travail",
  CONTRIBUTIONS: "contributions",
  EDITORIAL_CONTENT: "information",
  EXTERNALS: "external",
  GLOSSARY: "glossary",
  HIGHLIGHTS: "highlights",
  IDCC: "idcc",
  LABOUR_LAW: "droit_du_travail",
  LETTERS: "modeles_de_courriers",
  PREQUALIFIED: "prequalified",
  SHEET_MT: "fiches_ministere_travail",
  SHEET_MT_PAGE: "page_fiche_ministere_travail",
  SHEET_SP: "fiches_service_public",
  THEMATIC_FILES: "dossiers",
  THEMES: "themes",
  TOOLS: "outils",
  VERSIONS: "versions",
};

// mapping elastic search source type -> route name
/** @type {{[key in cdtnSources.SourceRoute]: cdtnSources.RouteValues}} */
const routeBySource = {
  [SOURCES.CCN]: "convention-collective",
  [SOURCES.CCN_PAGE]: "page-convention-collective",
  [SOURCES.CDT]: "code-du-travail",
  [SOURCES.CONTRIBUTIONS]: "contribution",
  [SOURCES.EDITORIAL_CONTENT]: "information",
  [SOURCES.EXTERNALS]: "external",
  [SOURCES.GLOSSARY]: "glossaire",
  [SOURCES.IDCC]: "idcc",
  [SOURCES.LABOUR_LAW]: "droit-du-travail",
  [SOURCES.LETTERS]: "modeles-de-courriers",
  [SOURCES.SHEET_MT]: "fiche-ministere-travail",
  [SOURCES.SHEET_MT_PAGE]: "fiche-ministere-travail",
  [SOURCES.SHEET_SP]: "fiche-service-public",
  [SOURCES.THEMATIC_FILES]: "dossiers",
  [SOURCES.THEMES]: "themes",
  [SOURCES.TOOLS]: "outils",
};

// mapping elastic search source type -> source label
const labelBySource = {
  [SOURCES.CCN]: "Legifrance",
  [SOURCES.CDT]: "Code du travail",
  [SOURCES.CONTRIBUTIONS]: "Contributions",
  [SOURCES.EDITORIAL_CONTENT]: "Information",
  [SOURCES.EXTERNALS]: "Outils externes",
  [SOURCES.IDCC]: "Legifrance",
  [SOURCES.LABOUR_LAW]: "Le droit du travail",
  [SOURCES.LETTERS]: "Modèles de documents",
  [SOURCES.SHEET_SP]: "service-public.fr",
  [SOURCES.SHEET_MT]: "Ministère du Travail",
  [SOURCES.THEMATIC_FILES]: "Dossiers",
  [SOURCES.THEMES]: "Themes",
  [SOURCES.TOOLS]: "Outils",
};

const routes = /**@type {[import(".").SourceRoute, string][]}*/ (Object.entries(
  routeBySource
));

// code_du_travail -> Code du travail
/** @type {cdtnSources.getLabelBySource} */
const getLabelBySource = (src) => labelBySource[src];

// code_du_travail -> code-du-travail
/** @type {cdtnSources.getRouteBySource} */
const getRouteBySource = (src) => routeBySource[src];

// code-du-travail -> code_du_travail
/** @type {cdtnSources.getSourceByRoute} */
const getSourceByRoute = (slug) => {
  const [src] = routes.flatMap(([source, route]) =>
    route === slug ? [source] : []
  );
  return src;
};

module.exports = {
  SOURCES,
  getLabelBySource,
  getRouteBySource,
  getSourceByRoute,
};
