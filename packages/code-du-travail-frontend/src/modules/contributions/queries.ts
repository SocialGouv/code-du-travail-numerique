import { elasticDocumentsIndex, elasticsearchClient } from "../../api/utils";
import { SOURCES } from "@socialgouv/cdtn-utils";
import {
  DocumentElasticResult,
  fetchDocument,
  formatRelatedItems,
  LinkedContent,
} from "../documents";
import { Contribution, ContributionElasticDocument } from "./type";

export const fetchContributions = async <
  K extends keyof ContributionElasticDocument,
>(
  fields: K[],
  filters?: {
    cdtnIds?: string[];
    generic?: boolean;
  }
): Promise<Pick<ContributionElasticDocument, K>[]> => {
  const baseFilters: Array<any> = [
    { term: { source: SOURCES.CONTRIBUTIONS } },
    { term: { isPublished: true } },
  ];

  if (filters?.cdtnIds) {
    baseFilters.push({ terms: { cdtnId: filters.cdtnIds } });
  }

  if (filters?.generic) {
    baseFilters.push({ term: { idcc: "0000" } });
  }

  const result = await elasticsearchClient.search<
    Pick<ContributionElasticDocument, K>
  >({
    query: {
      bool: {
        filter: baseFilters,
      },
    },
    size: 3000,
    _source: fields,
    index: elasticDocumentsIndex,
  });

  return result.hits.hits
    .map(({ _source }) => _source)
    .filter((source) => source !== undefined);
};

const formatContribution = (
  contribution: ContributionElasticDocument | undefined
): Contribution | undefined => {
  if (!contribution) {
    return undefined;
  }
  return {
    ...contribution,
    isGeneric: contribution.idcc === "0000",
    isNoCDT: contribution?.type === "generic-no-cdt",
    isFicheSP: "raw" in contribution,
    relatedItems: contribution.linkedContent
      ? formatRelatedItems(contribution.linkedContent as LinkedContent[])
      : [],
  };
};

// Champs du document générique nécessaires au bloc de sélection de CC : les
// documents conventionnels ne portent pas ccSupported/ccUnextended/type, seul
// le document générique frère permet de classifier une CC choisie par l'usager.
export type GenericContributionInfos = Pick<
  ContributionElasticDocument,
  "ccSupported" | "ccUnextended" | "type" | "messageBlockGenericNoCDT"
>;

export const fetchGenericContributionInfos = async (
  genericSlug: string
): Promise<GenericContributionInfos | undefined> =>
  fetchDocument<
    GenericContributionInfos,
    keyof DocumentElasticResult<GenericContributionInfos>
  >(["ccSupported", "ccUnextended", "type", "messageBlockGenericNoCDT"], {
    index: elasticDocumentsIndex,
    query: {
      bool: {
        filter: [
          { term: { source: SOURCES.CONTRIBUTIONS } },
          { term: { slug: genericSlug } },
          { term: { isPublished: true } },
        ],
      },
    },
    size: 1,
  });

export const fetchContributionBySlug = async (
  slug: string
): Promise<Contribution | undefined> => {
  const response = await fetchDocument<
    ContributionElasticDocument,
    keyof DocumentElasticResult<ContributionElasticDocument>
  >(
    [
      "metas",
      "idcc",
      "date",
      "title",
      "slug",
      "type",
      "linkedContent",
      "breadcrumbs",
      "ccSupported",
      "ccUnextended",
      "messageBlock",
      "references",
      "ccnShortTitle",
      "ccnSlug",
      "raw",
      "ficheSpDescription",
      "content",
      "url",
      "messageBlockGenericNoCDT",
      "infographics",
      "smicValue",
    ],
    {
      index: elasticDocumentsIndex,
      query: {
        bool: {
          filter: [
            { term: { source: SOURCES.CONTRIBUTIONS } },
            { term: { slug } },
            { term: { isPublished: true } },
          ],
        },
      },
      size: 1,
    }
  );
  return formatContribution(response);
};
