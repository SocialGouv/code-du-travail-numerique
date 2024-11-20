import { elasticDocumentsIndex, elasticsearchClient } from "../../api/utils";
import { SOURCES } from "@socialgouv/cdtn-utils";
import { DocumentElasticResult, fetchDocument } from "../documents";
import { ContributionElasticDocument } from "./type";

export const fetchContributions = async <
  K extends keyof ContributionElasticDocument,
>(
  fields: K[],
  filters?: {
    cdtnIds?: string[];
    slugs?: string[];
  }
): Promise<Pick<ContributionElasticDocument, K>[]> => {
  const baseFilters: Array<any> = [
    { term: { source: SOURCES.CONTRIBUTIONS } },
    { term: { isPublished: true } },
  ];

  if (filters?.cdtnIds) {
    baseFilters.push({ terms: { cdtnId: filters.cdtnIds } });
  }
  if (filters?.slugs) {
    baseFilters.push({ terms: { slug: filters.slugs } });
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

export const fetchContributionBySlug = async (
  slug: string
): Promise<DocumentElasticResult<ContributionElasticDocument>> => {
  const response = await elasticsearchClient.search<
    DocumentElasticResult<ContributionElasticDocument>
  >({
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
  });
  const item = response.hits.hits[0];
  if (!item || !item._source) {
    throw new Error("not Found");
  }
  return { ...item._source, _id: item._id };
};
