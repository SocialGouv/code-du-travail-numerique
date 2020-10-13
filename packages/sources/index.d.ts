export as namespace cdtnSources

export function getLabelBySource(src: SourceLabel): string

export function getRouteBySource(src: SourceRoute): RouteValues

export function getSourceByRoute(slug: string): SourceValues | null

export const SOURCES:SOURCES

type SourceLabel = Exclude<SourceValues, "highlights" | "page_convention_collective" | "glossary" | "prequalified" | "page_fiche_ministere_travail"| "versions" >
type SourceRoute = Exclude<SourceValues, "highlights" |  "prequalified" | "versions" >

type SOURCES = {
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
}

type Routes = {
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
}

type SourceKeys = keyof SOURCES;
type SourceValues = SOURCES[SourceKeys];
type RouteValues = Routes[SourceRoute];
