import { ElasticSearchItem } from "./common";

type ElasticSearchContributionFicheSp = {
  type: "fiche-sp";
  url: string;
  date: string;
  raw: string;
};

type ElasticSearchContributionGenericNoCDT = {
  type: "generic-no-cdt";
  messageBlockGenericNoCDT: string;
};

type ElasticSearchContributionContent = {
  type: "content" | "cdt";
  content: string;
};

type ContributionLinkedContent = {
  slug: string;
  source: string;
  title: string;
  description?: string;
};

type ContributionRef = {
  url?: string | null;
  title: string;
};

type ContributionHighlight = {
  title?: string;
  content?: string;
  searchInfo?: string;
};

type ElasticSearchContributionBase = ElasticSearchItem<any> & {
  source: "contributions";
  linkedContent: ContributionLinkedContent[];
  references: ContributionRef[];
  idcc: string;
  messageBlock?: string;
} & (
    | ElasticSearchContributionFicheSp
    | ElasticSearchContributionContent
    | ElasticSearchContributionGenericNoCDT
  );

export type ElasticSearchContributionGeneric = ElasticSearchContributionBase & {
  ccSupported: string[];
  ccUnextended: string[];
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

export type ElasticSearchContributionWithInfoMessage =
  ElasticSearchContribution & {
    infoMessage: string;
  };
