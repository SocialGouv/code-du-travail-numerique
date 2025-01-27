import {
  Breadcrumb,
  ContributionContentBase,
  ContributionConventionnelInfos,
  ContributionDocumentJson,
  ContributionFicheSpContent,
  ContributionGenericInfos,
  ContributionGenericNoCDTContent,
  ContributionHighlight,
  ContributionMetadata,
  DocumentElasticWithSource,
  ExportContributionFullLinkedContent,
} from "@socialgouv/cdtn-types";
import { RelatedItem } from "../documents";

type ExportContributionInfo = {
  breadcrumbs: Breadcrumb[];
  highlight?: ContributionHighlight;
  messageBlock?: string;
};

export type ContributionContent = Partial<ContributionContentBase> &
  Partial<ContributionFicheSpContent> &
  Partial<ContributionGenericNoCDTContent>;

type ContributionElasticDocumentBase = Omit<
  DocumentElasticWithSource<Omit<ContributionDocumentJson, "linkedContent">>,
  "breadcrumbs"
> &
  ContributionMetadata &
  ContributionContent &
  ExportContributionFullLinkedContent &
  ExportContributionInfo & {
    raw: string;
    url: string;
    content: string;
  };

export type ContributionElasticDocument = ContributionElasticDocumentBase &
  Partial<ContributionGenericInfos> &
  Partial<ContributionConventionnelInfos>;

export type ContributionRelatedItems = {
  title: string;
  items: RelatedItem[];
};

export type Contribution = ContributionElasticDocument & {
  isGeneric: boolean;
  isNoCDT: boolean;
  isFicheSP: boolean;
  relatedItems: ContributionRelatedItems[];
};
