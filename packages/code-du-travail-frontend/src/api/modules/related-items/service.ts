import { elasticDocumentsIndex, elasticsearchClient } from "../../utils";
import { getRelatedItemsBody } from "./queries";
import { RelatedItem } from "./type";
import { nonNullable } from "@socialgouv/modeles-social";
import { getRouteBySource } from "@socialgouv/cdtn-utils";

const MAX_RESULTS = 4;

export type RelatedItemSettings = {
  _id: string;
};

// use search based on item title : More Like This & Semantic
export const getSearchBasedItems = async (settings: RelatedItemSettings) => {
  const relatedItemBody = getRelatedItemsBody([settings]);
  const { hits } = await elasticsearchClient.search<
    RelatedItem & { slug: string }
  >({
    ...relatedItemBody,
    _source: ["title", "source", "slug", "url"],
    index: elasticDocumentsIndex,
  });

  return hits.hits.map(({ _source }) => _source).filter(nonNullable);
};

export const getRelatedItems = async (
  settings: RelatedItemSettings,
  excludedSlug: string
): Promise<RelatedItem[]> => {
  const searchBasedItems = await getSearchBasedItems(settings);

  const filteredItems = searchBasedItems
    // avoid elements already visible within the item as fragments
    .filter(
      (item: { slug: string }) =>
        !excludedSlug.startsWith(item.slug.split("#")[0])
    )
    .reduce((acc, related) => {
      const key = related.source + related.slug;
      if (!acc.has(key)) acc.set(key, related);
      return acc;
    }, new Map())
    .values();

  return Array.from(filteredItems)
    .slice(0, MAX_RESULTS)
    .map((item) => ({
      url: item.url ?? `/${getRouteBySource(item.source)}/${item.slug}`,
      source: item.source,
      title: item.title,
    }));
};
