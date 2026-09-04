import { SOURCES } from "@socialgouv/cdtn-utils";
import { DocumentElastic } from "@socialgouv/cdtn-types/build/elastic/common";

export type DocumentElasticResult<T> = T & {
  _id: string;
};

export const sources = [
  SOURCES.TOOLS,
  SOURCES.SHEET_SP,
  SOURCES.SHEET_MT,
  SOURCES.LETTERS,
  SOURCES.CONTRIBUTIONS,
  SOURCES.EXTERNALS,
  SOURCES.LABOUR_LAW,
  SOURCES.SHEET_MT_PAGE,
  SOURCES.INFOGRAPHICS,
] as const;

export type Source = (typeof sources)[number];

// Titres des deux groupes de contenus liés. Ils vivent ici, et non dans
// `fetch-related-items.ts`, pour rester importables depuis un composant client
// sans embarquer le client Elasticsearch : les fiches contribution filtrent les
// « Articles liés » quand la rubrique « Explorez nos thématiques » prend leur
// place (#7455).
export const RELATED_TOOLS_TITLE = "Modèles et simulateurs liés";
export const RELATED_ARTICLES_TITLE = "Articles liés";

export type RelatedItem = Pick<DocumentElastic, "title"> & {
  source: Source;
  url: string;
};

export type LinkedContent = Pick<DocumentElastic, "title"> & {
  source: Source;
  slug: string;
  url?: string;
};
