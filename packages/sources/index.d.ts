export as namespace cdtnSources

export function getLabelBySourceFn(src: SourceLabel): string

export function getRouteBySourceFn(src: SourceRoute): string

export function getSourceByRouteFn(slug: string): SourceValues | null

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

type SourceKeys = keyof SOURCES;
type SourceValues = SOURCES[SourceKeys];
