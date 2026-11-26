import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-utils";
import { SearchAlgo, SearchResult } from "./service";

// Remove Duplicates
export const predicateFn = ({ source, slug }: SearchResult) =>
  `${getRouteBySource(source) || source}/${slug}`;

export const removeDuplicate = (
  arr: SearchResult[],
  predicate: (e: SearchResult) => string = predicateFn
) =>
  arr.flatMap((a, index) => {
    if (arr.find((item, i) => predicate(item) === predicate(a) && i < index)) {
      return [];
    } else {
      return a;
    }
  });

/**
 * Score of the promoted news item (title relevance × freshness) needed to
 * reach each position: a fresh news whose title matches the query well comes
 * first, an older or looser one comes after the first results.
 */
export const NEWS_POSITION_MIN_SCORES = [5, 2];

export const getNewsPosition = (score: number | undefined): number => {
  const position = NEWS_POSITION_MIN_SCORES.findIndex(
    (minScore) => (score ?? 0) >= minScore
  );
  return position === -1 ? NEWS_POSITION_MIN_SCORES.length : position;
};

/**
 * Moves the news item up to the position its score deserves, unless it
 * already ranks higher.
 */
export const promoteNews = (
  documents: SearchResult[],
  news: SearchResult | undefined
): SearchResult[] => {
  if (!news) return documents;
  const position = getNewsPosition(news._score);
  const key = predicateFn(news);
  const index = documents.findIndex((doc) => predicateFn(doc) === key);
  if (index !== -1 && index <= position) return documents;

  const others = documents.filter((doc) => predicateFn(doc) !== key);
  const promoted = index === -1 ? news : documents[index];
  return [...others.slice(0, position), promoted, ...others.slice(position)];
};

export function extractHits(response) {
  if (response && response.hits) {
    return response.hits.hits;
  }
  return [];
}

export const esDocToSearchResult =
  (algo: SearchAlgo) =>
  ({ _score, _source }): SearchResult => {
    // `metaDescription` ne sert qu'à décrire les actualités, qui n'ont pas
    // de description : on ne l'expose pas dans le résultat.
    const { metaDescription, ...source } = _source;
    return {
      _score: _score ?? null,
      ...source,
      ...(source.source === SOURCES.NEWS && !source.description
        ? { description: metaDescription }
        : {}),
      title: source.displayTitle ?? source.shortTitle ?? source.title,
      algo,
    };
  };
