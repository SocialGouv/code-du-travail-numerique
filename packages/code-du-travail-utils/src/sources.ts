export const SOURCES = {
  CCN: "conventions_collectives",
  CDT: "code_du_travail",
  CONTRIBUTIONS: "contributions",
  EDITORIAL_CONTENT: "information",
  EXTERNALS: "external",
  GLOSSARY: "glossary",
  HIGHLIGHTS: "highlights",
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

export const routeBySource = {
  [SOURCES.CCN]: "convention-collective",
  [SOURCES.CDT]: "code-du-travail",
  [SOURCES.CONTRIBUTIONS]: "contribution",
  [SOURCES.EDITORIAL_CONTENT]: "information",
  [SOURCES.EXTERNALS]: "external",
  [SOURCES.GLOSSARY]: "glossaire",
  [SOURCES.LABOUR_LAW]: "droit-du-travail",
  [SOURCES.LETTERS]: "modeles-de-courriers",
  [SOURCES.SHEET_MT]: "fiche-ministere-travail",
  [SOURCES.SHEET_MT_PAGE]: "fiche-ministere-travail",
  [SOURCES.SHEET_SP]: "fiche-service-public",
  [SOURCES.THEMATIC_FILES]: "dossiers",
  [SOURCES.THEMES]: "themes",
  [SOURCES.TOOLS]: "outils",
  [SOURCES.HIGHLIGHTS]: "highlights",
  [SOURCES.PREQUALIFIED]: "prequalified",
};

export const labelBySource = {
  [SOURCES.CCN]: "Conventions collectives",
  [SOURCES.CDT]: "Code du travail",
  [SOURCES.CONTRIBUTIONS]: "Contributions",
  [SOURCES.EDITORIAL_CONTENT]: "Information",
  [SOURCES.EXTERNALS]: "Outils externes",
  [SOURCES.LABOUR_LAW]: "Le droit du travail",
  [SOURCES.LETTERS]: "Modèles de documents",
  [SOURCES.SHEET_SP]: "service-public.fr",
  [SOURCES.SHEET_MT]: "Ministère du Travail",
  [SOURCES.SHEET_MT_PAGE]: "Ministère du Travail",
  [SOURCES.THEMATIC_FILES]: "Dossiers",
  [SOURCES.THEMES]: "Themes",
  [SOURCES.TOOLS]: "Outils",
  [SOURCES.HIGHLIGHTS]: "À la une",
  [SOURCES.PREQUALIFIED]: "Requêtes préqualifiées",
};

export const getLabelBySource = (src: string) => labelBySource[src];

export const getRouteBySource = (src: string) => routeBySource[src];

export const getSourceByRoute = (slug: string) => {
  const routes = Object.entries(routeBySource);
  const [src] = routes.flatMap(([source, route]) =>
    route === slug ? [source] : []
  );
  return src;
};
