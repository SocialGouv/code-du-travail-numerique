export function getLabelBySource(src: SourceLabel): string

export function getRouteBySource(src: SourceRoute): RouteValues

export function getSourceByRoute(slug: RouteValues): SourceRoute

export as namespace cdtnSources

const SOURCES: Sources


type Sources = {
  CCN: "conventions_collectives",
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
}

type Routes = {
  [SOURCES.CCN]: "convention-collective",
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
}

type SourceKeys = keyof Sources;
type SourceValues = Sources[SourceKeys];
type RouteKeys = keyof Routes;
type RouteValues = Routes[SourceRoute];
type SourceLabel = Exclude<SourceValues, "highlights" | "glossary" | "prequalified" | "versions" >
type SourceRoute = Exclude<SourceValues, "highlights" |  "prequalified" | "versions" >
