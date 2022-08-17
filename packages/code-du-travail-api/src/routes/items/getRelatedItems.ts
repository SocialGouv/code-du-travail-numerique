import elasticsearchClient from "../../conf/elasticsearch";
import { getRelatedItemsBody } from "./relatedItems.es";
import { getSearchBySourceSlugBody } from "./searchBySourceSlug.es";

const { SOURCES, getSourceByRoute } = require("@socialgouv/cdtn-sources");
const { DOCUMENTS, vectorizeQuery } = require("@socialgouv/cdtn-elasticsearch");
const getSemBody = require("../search/search.sem");
const utils = require("../search/utils");
const { logger } = require("@socialgouv/cdtn-logger");
const { CDTN_ADMIN_VERSION } = require("../v1.prefix.js");

const MAX_RESULTS = 4;

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX || "cdtn";
const index = `${ES_INDEX_PREFIX}-${CDTN_ADMIN_VERSION}_${DOCUMENTS}`;

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
      logger.error(`Unknown covisit : ${link}`);
      return [];
    } else {
      return [{ index }, getSearchBySourceSlugBody({ slug, source })];
    }
  });

  const esCovisits = await elasticsearchClient
    .msearch({
      body,
    })
    .then((resp) =>
      resp.body.responses.map((r) => r.hits.hits[0]).filter((r) => r)
    )
    .catch((err) => {
      logger.error(
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
export const getSearchBasedItems = async ({
  title,
  settings,
}: {
  title: string;
  settings: any;
}) => {
  const relatedItemBody = getRelatedItemsBody({ settings, sources });
  const requestBodies = [{ index }, relatedItemBody];

  const query_vector = await vectorizeQuery(title.toLowerCase()).catch(
    (error: any) => {
      logger.error(error.message);
    }
  );

  if (query_vector) {
    const semBody = getSemBody({
      query_vector,
      // we +1 the size to remove the document source that should match perfectly for the given vector
      size: MAX_RESULTS + 1,
      sources,
    });
    // we use relatedItem query _source to have the same prop returned
    // for both request
    // semBody._source = relatedItemBody._source;
    requestBodies.push({ index }, semBody);
  }

  const {
    body: {
      responses: [esResponse = {}, semResponse = {}],
    },
  } = await elasticsearchClient.msearch({ body: requestBodies });

  const { hits: { hits: semanticHits } = { hits: [] } } = semResponse;
  const { hits: { hits: fullTextHits } = { hits: [] } } = esResponse;

  return (
    utils
      .mergePipe(fullTextHits, semanticHits, MAX_RESULTS)
      // we filter fields and add some info about recommandation type for evaluation purpose
      .map(({ _source }: any) => mapSource("search")(_source))
  );
};

// get related items, depending on : covisits present & non empty
export const getRelatedItems = async ({
  title,
  settings,
  slug,
  covisits,
}: {
  title: string;
  settings: any;
  slug: string;
  covisits: string;
}): Promise<any> => {
  const covisitedItems = covisits ? await getCovisitedItems({ covisits }) : [];

  const searchBasedItems = await getSearchBasedItems({ settings, title });

  const filteredItems = covisitedItems
    .concat(searchBasedItems)
    // avoid elements already visible within the item as fragments
    .filter(
      (item: { slug: string }) => !slug.startsWith(item.slug.split("#")[0])
    )
    // only return sources of interest
    .filter(({ source }: { source: string }) => sources.includes(source))
    // drop duplicates (between covisits and search) using source/slug
    .reduce((acc: any, related: { source: string; slug: string }) => {
      const key = related.source + related.slug;
      if (!acc.has(key)) acc.set(key, related);
      return acc;
    }, new Map())
    .values();

  return Array.from(filteredItems).slice(0, MAX_RESULTS);
};
