export type WidgetMessage = {
  [action: string]: {
    name: string;
    description: string;
    extra: {
      [key: string]: string;
    };
  }[];
};

export type WidgetSelect = {
  url: string;
  labelPath: string;
  valuePath: string;
};

export type Widget = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  description: string[];
  shortTitle: string;
  shortDescription: string;
  url: string;
  id: string;
  messages?: WidgetMessage;
  select?: WidgetSelect;
};

export type Integration = {
  [slug: string]: Widget;
};
