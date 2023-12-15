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
  references?: Reference[];
};

export type Breadcrumb = {
  label: string;
  slug: string;
  position?: number;
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

export type SearchResponse<T> = {
  hits: {
    total: {
      value: number;
    };
    hits: {
      _source: T;
    }[];
  };
};

export type Agreement = {
  id: string;
  num: number;
  shortTitle: string;
  slug?: string;
  title: string;
  url?: string;
  highlight?: {
    title: string;
    content: string;
    searchInfo?: string;
  };
  contributions: boolean;
};

export type ElasticSearchItem = {
  description: string;
  source: string;
  title: string;
  slug: string;
  breadcrumbs: Breadcrumb[];
};

type ElasticSearchContributionFicheSp = {
  type: "fiche-sp";
  url: string;
  date: string;
  raw: string;
};

type ElasticSearchContributionContent = {
  type: "content" | "cdt";
  content: string;
};

type ContributionLinkedContent = {
  slug: string;
  source: string;
  title: string;
};

type ContributionRef = {
  url: string;
  title: string;
};

type ContributionHighlight = {
  title?: string;
  content?: string;
  searchInfo?: string;
};

type ElasticSearchContributionBase = ElasticSearchItem & {
  source: "contributions";
  linkedContent: ContributionLinkedContent[];
  references: ContributionRef[];
  idcc: string;
  messageBlock?: string;
} & (ElasticSearchContributionFicheSp | ElasticSearchContributionContent);

export type ElasticSearchContributionGeneric = ElasticSearchContributionBase & {
  ccSupported: string[];
};

export type ElasticSearchContributionConventionnelle =
  ElasticSearchContributionBase & {
    ccnSlug: string;
    ccnShortTitle: string;
    highlight?: ContributionHighlight;
  };

export type ElasticSearchContribution =
  | ElasticSearchContributionGeneric
  | ElasticSearchContributionConventionnelle;

export type ElasticSearchConventionCollective = ElasticSearchContribution & {
  infoMessage: string;
};
