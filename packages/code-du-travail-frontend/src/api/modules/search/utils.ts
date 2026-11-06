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
  ({ _score, _source }): SearchResult => ({
    _score: _score ?? null,
    ..._source,
    // Les actualités n'ont pas de description : leur résumé est la meta description.
    ...(_source.source === SOURCES.NEWS && !_source.description
      ? { description: _source.metaDescription }
      : {}),
    title: _source.displayTitle ?? _source.shortTitle ?? _source.title,
    algo,
  });
