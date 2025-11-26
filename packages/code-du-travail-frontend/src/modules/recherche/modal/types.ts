export type DocumentType =
  | "THÉMATIQUE"
  | "DROIT DU TRAVAIL"
  | "CONVENTION COLLECTIVE"
  | "MODÈLE DE DOCUMENT"
  | "SIMULATEUR"
  | "INFOGRAPHIE"
  | "FICHE PRATIQUE";

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
