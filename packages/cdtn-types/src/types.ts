export enum SectionDisplayMode {
  accordion = "accordion",
  tab = "tab",
}

export enum BlockDisplayMode {
  line = "line",
  square = "square",
}

export enum ContentType {
  markdown = "markdown",
  graphic = "graphic",
  content = "content",
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

export declare type ContentBlockMarkdown = {
  type: ContentType.markdown;
  markdown: string;
  html: string;
};

export declare type ContentBlockGaphic = {
  type: ContentType.graphic;
  markdown: string;
  imgUrl: string;
  fileUrl: string;
  altText: string;
  size: string;
  html: string;
};

export declare type ContentBlockContent = {
  type: ContentType.content;
  title: string;
  blockDisplayMode: BlockDisplayMode;
  contents: ContentBlockContentItem[];
};

export declare type ContentBlockContentItem = {
  slug: string;
  title: string;
  cdtnId: string;
  source: string;
  description: string;
  icon?: string;
};

export declare type ContentBlock =
  | ContentBlockMarkdown
  | ContentBlockGaphic
  | ContentBlockContent;

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
  displayTitle?: string;
  references: Reference[];
  title: string;
  title_vector?: number[];
  icon?: string;
  dismissalProcess?: boolean;
  slug: string;
};

export type EditorialContentData = {
  _source: Partial<EditorialContent>;
  relatedItems?: string[];
};

export type EditorialContentDataWrapper = {
  information: EditorialContentData;
};

export type Tool = {
  date: string;
  icon: string;
  order: number;
  action: string;
  metaTitle: string;
  questions?: string[];
  description: string;
  displayTitle: string;
  breadcrumbs: Record<string, string | number>[];
  cdtnId: string;
  excludeFromSearch: boolean;
  id: string;
  isPublished: boolean;
  metaDescription: string;
  slug: string;
  source: string;
  text: string;
  title: string;
  title_vector: number[];
  _id: string;
  displayTool?: boolean;
};
