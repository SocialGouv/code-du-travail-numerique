import { SOURCES } from "@socialgouv/cdtn-utils";

import { elasticDocumentsIndex, elasticsearchClient } from "../../utils";
import { getRelatedItemsBody } from "./queries";

const MAX_RESULTS = 4;

// standard related items :
const sources = [
  SOURCES.TOOLS,
  SOURCES.SHEET_SP,
  SOURCES.SHEET_MT,
  SOURCES.LETTERS,
  SOURCES.CONTRIBUTIONS,
  SOURCES.EXTERNALS,
];

const mapSource =
  (reco: string) =>
  ({ action, description, icon, slug, source, subtitle, title, url }: any) => ({
    action,
    description,
    icon,
    reco,
    slug,
    source,
    subtitle,
    title,
    url,
  });

// use search based on item title : More Like This & Semantic
export const getSearchBasedItems = async ({ settings }: { settings: any }) => {
  const relatedItemBody = getRelatedItemsBody({ settings, sources });
  const requestBodies = [{ index: elasticDocumentsIndex }, relatedItemBody];

  const {
    responses: [esResponse = {}],
  }: any = await elasticsearchClient.msearch({ body: requestBodies });

  const { hits: { hits: fullTextHits } = { hits: [] } } = esResponse;

  return fullTextHits.map(({ _source }: any) => mapSource("search")(_source));
};

export const getRelatedItems = async ({
  settings,
  slug,
}: {
  settings: any;
  slug: string;
}): Promise<any> => {
  const searchBasedItems = await getSearchBasedItems({ settings });

  const filteredItems = searchBasedItems
    // avoid elements already visible within the item as fragments
    .filter(
      (item: { slug: string }) => !slug.startsWith(item.slug.split("#")[0])
    )
    // only return sources of interest
    .filter(({ source }: { source: any }) => sources.includes(source))
    .reduce((acc: any, related: { source: string; slug: string }) => {
      const key = related.source + related.slug;
      if (!acc.has(key)) acc.set(key, related);
      return acc;
    }, new Map())
    .values();

  return Array.from(filteredItems).slice(0, MAX_RESULTS);
};
