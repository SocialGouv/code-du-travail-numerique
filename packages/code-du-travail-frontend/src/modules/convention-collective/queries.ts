import { ElasticAgreement } from "@socialgouv/cdtn-types";
import { orderByAlpha } from "../utils";
import { SOURCES } from "@socialgouv/cdtn-utils";
import { elasticDocumentsIndex, elasticsearchClient } from "../../api/utils";

type Props<K> = {
  fields?: K[];
  sortBy?: K;
  filterTitle?: string;
  size?: number;
};

export const fetchAllAgreements = async <K extends keyof ElasticAgreement>({
  fields,
  sortBy,
  filterTitle,
  size = 100,
}: Props<K>): Promise<Pick<ElasticAgreement, K>[]> => {
  const response = await elasticsearchClient.search<Pick<ElasticAgreement, K>>({
    query: {
      bool: {
        ...(filterTitle
          ? {
              should: [
                {
                  match: {
                    "shortTitle.french": {
                      boost: 0.9,
                      fuzziness: "1",
                      query: filterTitle,
                    },
                  },
                },
                {
                  match_phrase_prefix: {
                    "synonymes.french": {
                      query: filterTitle,
                    },
                  },
                },
                {
                  match_phrase_prefix: {
                    "title.french": {
                      query: filterTitle,
                    },
                  },
                },
              ],
            }
          : {}),
        filter: [
          { term: { source: SOURCES.CCN } },
          { term: { isPublished: true } },
          { term: { contributions: true } },
        ],
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
