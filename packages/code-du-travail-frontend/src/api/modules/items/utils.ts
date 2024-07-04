import { getSourceByRoute, SOURCES } from "@socialgouv/cdtn-utils";

import { elasticDocumentsIndex, elasticsearchClient } from "../../utils";
import { getSearchBySourceSlugBody, getRelatedItemsBody } from "./queries";

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

// select certain fields and add recommendation source (covisits or search)
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

// rely on covisit links within the item, computed offline from usage logs (Monolog)
export const getCovisitedItems = async ({ covisits }: { covisits: any }) => {
  // covisits as related items
  const body = covisits.flatMap(({ link }: { link: string }) => {
    const [route, slug] = link.split("/");
    const source = getSourceByRoute(route);
    if (!(slug && source)) {
      console.error(`Unknown covisit : ${link}`);
      return [];
    } else {
      return [
        { index: elasticDocumentsIndex },
        getSearchBySourceSlugBody({ slug, source }),
      ];
    }
  });

  const esCovisits = await elasticsearchClient
    .msearch({
      body,
    })
    .then((resp: any) =>
      resp.responses.map((r) => r.hits.hits[0]).filter((r) => r)
    )
    .catch((err) => {
      console.error(
        "Error when querying covisits : " + JSON.stringify(err.meta.body)
      );
      return [];
    });

  const covisitedItems = esCovisits
    // we filter fields and add some info about recommandation type for evaluation purpose
    .map(({ _source }: { _source: any }) => mapSource("covisits")(_source))
    .slice(0, MAX_RESULTS);

  return covisitedItems;
};

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

// get related items, depending on : covisits present & non empty
export const getRelatedItems = async ({
  settings,
  slug,
  covisits,
}: {
  settings: any;
  slug: string;
  covisits: string;
}): Promise<any> => {
  const covisitedItems = covisits ? await getCovisitedItems({ covisits }) : [];

  const searchBasedItems = await getSearchBasedItems({ settings });

  const filteredItems = covisitedItems
    .concat(searchBasedItems)
    // avoid elements already visible within the item as fragments
    .filter(
      (item: { slug: string }) => !slug.startsWith(item.slug.split("#")[0])
    )
    // only return sources of interest
    .filter(({ source }: { source: any }) => sources.includes(source))
    // drop duplicates (between covisits and search) using source/slug
    .reduce((acc: any, related: { source: string; slug: string }) => {
      const key = related.source + related.slug;
      if (!acc.has(key)) acc.set(key, related);
      return acc;
    }, new Map())
    .values();

  return Array.from(filteredItems).slice(0, MAX_RESULTS);
};
