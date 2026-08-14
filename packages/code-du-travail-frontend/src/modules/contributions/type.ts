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
  Partial<ContributionConventionnelInfos> & { smicValue?: number };

export type ContributionRelatedItems = {
  title: string;
  items: RelatedItem[];
};

// Lien vers la déclinaison d'une contribution pour une convention collective.
// Construit côté serveur (cf. fetchAgreementDeclinations) et transmis tel quel
// aux composants client : il ne contient que des valeurs sérialisables.
export type AgreementDeclination = {
  shortTitle: string;
  href: string;
};

export type Contribution = ContributionElasticDocument & {
  isGeneric: boolean;
  isNoCDT: boolean;
  isFicheSP: boolean;
  relatedItems: ContributionRelatedItems[];
};
