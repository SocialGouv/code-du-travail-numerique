import { elasticDocumentsIndex, elasticsearchClient } from "../../api/utils";
import { ContributionElasticDocument } from "@socialgouv/cdtn-types";
import { SOURCES } from "@socialgouv/cdtn-utils";
import { DocumentElasticResult, fetchDocument } from "../documents";

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

export const fetchContributionDocument = async (
  slug: string
): Promise<DocumentElasticResult<ContributionElasticDocument> | undefined> => {
  return await fetchDocument<
    ContributionElasticDocument,
    keyof DocumentElasticResult<ContributionElasticDocument>
  >(
    [
      "description",
      "title",
      "_id",
      "metas",
      "questionName",
      "date",
      "contentType",
    ],
    {
      query: {
        bool: {
          filter: [
            { term: { source: SOURCES.CONTRIBUTIONS } },
            { term: { slug } },
            { term: { isPublished: true } },
          ],
        },
      },
    }
  );
};
