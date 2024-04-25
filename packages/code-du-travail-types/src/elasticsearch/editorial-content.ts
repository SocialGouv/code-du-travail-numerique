import { Breadcrumb } from "./common";

export type EditorialContentDataWrapper = {
  information: EditorialContentData;
};

type EditorialContentData = {
  _source: Partial<EditorialContent>;
  relatedItems?: string[];
};

export type EditorialContent = {
  cdtnId: string;
  breadcrumbs: Breadcrumb[];
  contents: EditorialContentContent[];
  date: string;
  metaDescription: string;
  sectionDisplayMode: EditorialSectionDisplayMode;
  intro?: string;
  displayTitle?: string;
  references: EditorialReference[];
  title: string;
  title_vector?: number[];
  icon?: string;
  dismissalProcess?: boolean;
  slug: string;
};

export type EditorialContentContent = {
  name: string;
  title: string;
  blocks: ContentBlock[];
  references?: EditorialReference[];
};

type ContentBlockMarkdown = {
  type: EditorialContentType.markdown;
  markdown: string;
  html: string;
};

type ContentBlockGraphic = {
  type: EditorialContentType.graphic;
  markdown: string;
  imgUrl: string;
  fileUrl: string;
  altText: string;
  size: string;
  html: string;
};

type ContentBlockContent = {
  type: EditorialContentType.content;
  title: string;
  blockDisplayMode: EditorialContentBlockDisplayMode;
  contents: ContentBlockContentItem[];
};

type ContentBlockContentItem = {
  slug: string;
  title: string;
  cdtnId: string;
  source: string;
  description: string;
  icon?: string;
};

type ContentBlock =
  | ContentBlockMarkdown
  | ContentBlockGraphic
  | ContentBlockContent;

export enum EditorialContentBlockDisplayMode {
  line = "line",
  square = "square",
}

export enum EditorialContentType {
  markdown = "markdown",
  graphic = "graphic",
  content = "content",
}

export enum EditorialSectionDisplayMode {
  accordion = "accordion",
  tab = "tab",
}

type EditorialReference = {
  label: string;
  links: ReferenceLink[];
};

type ReferenceLink = {
  id: string;
  type: string;
  slug: string;
  title: string;
  url: string;
};
