import { SOURCES } from "@socialgouv/cdtn-utils";

import { elasticDocumentsIndex, elasticsearchClient } from "../../utils";
import { getRelatedItemsBody } from "./queries";

const MAX_RESULTS = 4;

// standard related items :
const sources: string[] = [
  SOURCES.TOOLS,
  SOURCES.SHEET_SP,
  SOURCES.SHEET_MT,
  SOURCES.LETTERS,
  SOURCES.CONTRIBUTIONS,
  SOURCES.EXTERNALS,
];

export type RelatedItem = {
  description: string;
  reco: string;
  slug: string;
  source: string;
  title: string;
};

export type RelatedItemSettings = {
  _id: string;
};

// select certain fields and add recommendation source (covisits or search)
const mapSource =
  (reco: string) =>
  ({ description, slug, source, title }: RelatedItem) => ({
    description,
    reco,
    slug,
    source,
    title,
  });

// use search based on item title : More Like This & Semantic
export const getSearchBasedItems = async ({
  settings,
}: {
  settings: RelatedItemSettings[];
}) => {
  const relatedItemBody = getRelatedItemsBody({ settings, sources });

  const { hits } = await elasticsearchClient.search<RelatedItem>({
    body: relatedItemBody,
    index: elasticDocumentsIndex,
  });

  return hits.hits.map(({ _source }) => mapSource("search")(_source!));
};

// get related items, depending on : covisits present & non empty
export const getRelatedItems = async ({
  settings,
  slug,
}: {
  settings: RelatedItemSettings[];
  slug: string;
}): Promise<RelatedItem[]> => {
  const searchBasedItems = await getSearchBasedItems({ settings });

  const filteredItems =
    // drop duplicates (between covisits and search) using source/slug
    searchBasedItems
      // avoid elements already visible within the item as fragments
      .filter(
        (item: { slug: string }) => !slug.startsWith(item.slug.split("#")[0])
      )
      // only return sources of interest
      .filter(({ source }) => sources.includes(source))
      .reduce<Map<string, RelatedItem>>((acc: any, related: RelatedItem) => {
        const key = related.source + related.slug;
        if (!acc.has(key)) acc.set(key, related);
        return acc;
      }, new Map())
      .values();

  return Array.from(filteredItems).slice(0, MAX_RESULTS);
};
