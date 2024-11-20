import {
  Breadcrumb,
  ContributionContent,
  ContributionDocumentJson,
  ContributionHighlight,
  ContributionMetadata,
  DocumentElasticWithSource,
  ExportContributionFullLinkedContent,
} from "@socialgouv/cdtn-types";

export interface ContributionConventionnelInfos {
  ccnSlug: string;
  ccnShortTitle: string;
  isGeneric: false;
}
export interface ContributionGenericInfos {
  ccSupported: string[];
  ccUnextended: string[];
  isGeneric: true;
}

type ExportContributionInfo = {
  breadcrumbs: Breadcrumb[];
  highlight?: ContributionHighlight;
  messageBlock?: string;
};

type ContributionElasticDocumentBase = Omit<
  DocumentElasticWithSource<Omit<ContributionDocumentJson, "linkedContent">>,
  "breadcrumbs"
> &
  ContributionMetadata &
  ContributionContent &
  ExportContributionFullLinkedContent &
  ExportContributionInfo;

export type ContributionElasticDocument = ContributionElasticDocumentBase &
  (ContributionGenericInfos | ContributionConventionnelInfos);
