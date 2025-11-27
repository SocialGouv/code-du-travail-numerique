import { SourceKeys, SOURCES } from "@socialgouv/cdtn-utils";
import { elasticDocumentsIndex, elasticsearchClient } from "../../utils";
import { getIdccBody } from "./queries";

export const parseIdcc = (query) =>
  /^\d+$/.test(query) ? parseInt(query, 10) : undefined;

export const getIdccByQuery = async (query: string, size?: number) => {
  const idccQuery = parseIdcc(query);

  const body: any = getIdccBody({ idccQuery, query, size });

  const response = await elasticsearchClient.search<any>({
    body,
    index: elasticDocumentsIndex,
  });
  const { took, ...rest } = response;
  return { ...rest };
};

const extractHits = (response) =>
  response?.hits?.hits ? response.hits.hits : [];

const idccs: Set<number> = await elasticsearchClient
  .search<any>({
    body: {
      size: 1000,
      _source: ["id"],
      query: {
        bool: {
          filter: [
            { term: { source: SOURCES.CCN } },
            { term: { isPublished: true } },
          ],
        },
      },
    },
    index: elasticDocumentsIndex,
  })
  .then(
    (r) =>
      new Set(
        extractHits(r).map((t: { _source: { id: number } }) => t._source.id)
      )
  );

export const isIdccToken = (token: string) =>
  !isNaN(parseFloat(token)) && idccs.has(parseFloat(token));

export const ccSearch = async (
  query: string,
  threshold: number
): Promise<
  | {
      slug: string;
      title: string;
      cdtnId: string;
      score: number;
      source: SourceKeys;
    }
  | undefined
> => {
  const idccResults = await getIdccByQuery(query, 1);

  const hits = extractHits(idccResults);

  if (hits.length > 0 && (hits[0]["_score"] || 0) > threshold) {
    const hit = hits[0];
    return {
      slug: hit["_source"]["slug"],
      title: hit["_source"]["shortTitle"],
      cdtnId: hit["_source"]["cdtnId"],
      score: hit["_score"] || undefined,
      source: SOURCES.CCN,
    };
  }
};
