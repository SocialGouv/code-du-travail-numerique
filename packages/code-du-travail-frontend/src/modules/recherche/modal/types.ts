export type DocumentType =
  | "MODELE DE DOCUMENT"
  | "THEME"
  | "ARTICLE DU DROIT DU TRAVAIL"
  | "CONVENTION COLLECTIVE"
  | "CONTENU";

export type SearchResult = {
  id: string;
  type: DocumentType;
  title: string;
  slug: string;
};

export type ModalLink = {
  id: string;
  title: string;
  slug: string;
};

export type HintsData = {
  actualites: ModalLink[];
  suggestions: ModalLink[];
};
