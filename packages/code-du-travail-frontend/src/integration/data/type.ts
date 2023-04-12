export type WidgetMessage = {
  [action: string]: {
    name: string;
    description: string;
  }[];
};

export type Widget = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  description: string;
  shortTitle: string;
  shortDescription: string;
  url: string;
  id: string;
  messages?: WidgetMessage;
};

export type Integration = {
  [slug: string]: Widget;
};
