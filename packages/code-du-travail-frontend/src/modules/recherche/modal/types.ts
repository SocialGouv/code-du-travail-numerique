export type DocumentType =
  | "MODELE DE DOCUMENT"
  | "THEME"
  | "ARTICLE DU DROIT DU TRAVAIL"
  | "CONVENTION COLLECTIVE"
  | "CONTENU";

export interface SearchResult {
  id: string;
  type: DocumentType;
  title: string;
  slug?: string;
}

export interface SearchResultsByCategory {
  actualites: SearchResult[];
  suggestions: SearchResult[];
}
