import * as Sentry from "@sentry/nextjs";
import { elasticDocumentsIndex, elasticsearchClient } from "../../api/utils";
import { SOURCES } from "@socialgouv/cdtn-utils";
import { DocumentElasticResult, fetchDocument, isSource } from "../documents";
import { Contribution, ContributionElasticDocument } from "./type";

export const fetchContributions = async <
  K extends keyof ContributionElasticDocument,
>(
  fields: K[],
  filters?: {
    cdtnIds?: string[];
  }
): Promise<Pick<ContributionElasticDocument, K>[]> => {
  const baseFilters: Array<any> = [
    { term: { source: SOURCES.CONTRIBUTIONS } },
    { term: { isPublished: true } },
  ];

  if (filters?.cdtnIds) {
    baseFilters.push({ terms: { cdtnId: filters.cdtnIds } });
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
    relatedItems: [
      {
        title: "Articles liés",
        items: contribution.linkedContent.reduce((arr, linked) => {
          if (!isSource(linked.source)) {
            Sentry.captureMessage(
              `la source de ${JSON.stringify(linked)} est incorrecte`
            );
            return arr;
          }
          return [
            ...arr,
            {
              title: linked.title,
              url: linked.slug,
              source: linked.source,
            },
          ];
        }, []),
      },
    ],
  };
};

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
      "raw",
      "ficheSpDescription",
      "content",
      "url",
      "messageBlockGenericNoCDT",
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
