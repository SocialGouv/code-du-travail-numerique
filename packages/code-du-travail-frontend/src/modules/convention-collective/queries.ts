import { ElasticAgreement } from "@socialgouv/cdtn-types";
import { orderByAlpha } from "../utils";
import { SOURCES } from "@socialgouv/cdtn-utils";
import { elasticDocumentsIndex, elasticsearchClient } from "../../api/utils";

type Props<K> = {
  fields?: K[];
  sortBy?: K;
  filters?: {
    cdtnIds?: string[];
    title?: string;
  };
  size?: number;
};

export const fetchAgreements = async <K extends keyof ElasticAgreement>({
  fields,
  sortBy,
  filters,
  size = 100,
}: Props<K>): Promise<Pick<ElasticAgreement, K>[]> => {
  const baseFilters: Array<any> = [
    { term: { source: SOURCES.CCN } },
    { term: { isPublished: true } },
    { term: { contributions: true } },
  ];
  if (filters?.cdtnIds) {
    baseFilters.push({ terms: { cdtnId: filters.cdtnIds } });
  }
  const response = await elasticsearchClient.search<Pick<ElasticAgreement, K>>({
    query: {
      bool: {
        ...(filters?.title
          ? {
              should: [
                {
                  match: {
                    "shortTitle.french": {
                      boost: 0.9,
                      fuzziness: "1",
                      query: filters.title,
                    },
                  },
                },
                {
                  match_phrase_prefix: {
                    "synonymes.french": {
                      query: filters.title,
                    },
                  },
                },
                {
                  match_phrase_prefix: {
                    "title.french": {
                      query: filters.title,
                    },
                  },
                },
              ],
            }
          : {}),
        filter: baseFilters,
      },
    },
    size,
    ...(fields ? { _source: fields } : {}),
    index: elasticDocumentsIndex,
  });

  const data = response.hits.hits
    .map(({ _source }) => _source)
    .filter((item) => item !== undefined);
  if (sortBy) {
    data.sort((a, b) => orderByAlpha(a, b, sortBy));
  }
  return data;
};
