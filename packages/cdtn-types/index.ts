export enum SectionDisplayMode {
  accordeon = "accordeon",
  tab = "tab",
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

export type Content = {
  type: string;
  name: string;
  altText: string;
  size: number;
  html: string;
  imgUrl: string;
  fileUrl: string;
  title: string;
  references: Reference[];
};

export type Breadcrumb = {
  label: string;
  slug: string;
}

export type EditorialContent = {
  breadcrumbs: Breadcrumb[];
  contents: Content[];
  date: string;
  metaDescription: string;
  sectionDisplayMode: SectionDisplayMode;
  intro?: string;
  references: Reference[];
  title: string;
};

export type EditorialContentData = {
  _source: Partial<EditorialContent>;
  relatedItems?: any[];
};

export type EditorialContentDataWrapper = {
  anchor: any;
  information: EditorialContentData;
};
