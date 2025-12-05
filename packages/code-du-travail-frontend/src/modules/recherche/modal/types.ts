export type ModalLink = {
  id: string;
  title: string;
  slug: string;
};

export type HintsData = {
  actualites: ModalLink[];
  suggestions: ModalLink[];
};
