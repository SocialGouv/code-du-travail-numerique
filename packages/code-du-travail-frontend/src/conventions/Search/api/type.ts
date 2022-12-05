export type agreement = {
  id: string;
  num: number;
  shorttitle: string;
  slug: string;
  title: string;
  url?: string;
  highlight?: {
    title: string;
    content: string;
    searchinfo?: string;
  };
}
