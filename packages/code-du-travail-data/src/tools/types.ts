export type Tool = {
  id: string;
  icon: string;
  title: string;
  description: string;
  action: string;
};

export type ExternalTool = Tool & {
  url: string;
};

export type InternalTool = Tool & {
  displayTitle: string;
  metaTitle: string;
  slug: string;
  questions: string[];
  metaDescription: string;
  date: string;
  enable: boolean;
};
