export type Agreement = {
  id: string;
  num: number;
  shortTitle: string;
  slug: string;
  title: string;
  url?: string;
  highlight?: {
    title: string;
    content: string;
    searchInfo?: string;
  };
};
