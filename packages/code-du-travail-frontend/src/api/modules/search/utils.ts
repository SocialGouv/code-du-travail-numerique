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
