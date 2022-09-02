export enum SectionDisplayMode {
  accordion = "accordion",
  tab = "tab",
}

export enum BlockDisplayMode {
  line = "line",
  square = "square",
}

export type ReferenceLink = {
  id: string;
  type: string;
  slug: string;
  title: string;
  url: string;
};

export type Reference = {
  label: string;
  links: ReferenceLink[];
};

export type ContentItem = {
  cdtnId: string;
  source: string;
  title: string;
  slug: string;
  description: string;
  icon?: string;
};

export declare type ContentBlock = {
  type: string;
  markdown?: string;
  imgUrl?: string;
  fileUrl?: string;
  altText?: string;
  html?: string;
  size?: number;
  blockDisplayMode?: BlockDisplayMode;
  contents?: EditorialContent[];
  title?: string;
};

export declare type Content = {
  name: string;
  title: string;
  blocks: ContentBlock[];
  references: Reference[];
};

export type Breadcrumb = {
  label: string;
  slug: string;
};

export type EditorialContent = {
  cdtnId: string;
  breadcrumbs: Breadcrumb[];
  contents: Content[];
  date: string;
  metaDescription: string;
  sectionDisplayMode: SectionDisplayMode;
  intro?: string;
  references: Reference[];
  title: string;
  title_vector?: number[];
  icon?: string;
  questionnaire?: string;
};

export type EditorialContentData = {
  _source: Partial<EditorialContent>;
  relatedItems?: string[];
  slug: string;
};

export type EditorialContentDataWrapper = {
  anchor: string[];
  information: EditorialContentData;
};
