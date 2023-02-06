export type Widget = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  description: string;
  url: string;
  id: string;
};

export type Integration = {
  [slug: string]: Widget;
};
