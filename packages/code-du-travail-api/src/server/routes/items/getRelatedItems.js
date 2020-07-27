const { SOURCES, getSourceByRoute } = require("@socialgouv/cdtn-sources");
const { DOCUMENTS } = require("@cdt/data/indexing/esIndexName");
const { vectorizeQuery } = require("@cdt/data/indexing/vectorizer");

const elasticsearchClient = require("../../conf/elasticsearch.js");
const getSearchBody = require("./searchBySourceSlug.elastic");
const getSemBody = require("../search/search.sem");
const utils = require("../search/utils");
const getRelatedItemsBody = require("./relatedItems.elastic");
const { logger } = require("../../utils/logger");

const MAX_RESULTS = 4;

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX || "cdtn";
const index = `${ES_INDEX_PREFIX}_${DOCUMENTS}`;

// ratio for A/B testing between covisit and search based related items
const abRatio = 0.5;

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
const mapSource = (reco) => ({
  action,
  description,
  icon,
  slug,
  source,
  subtitle,
  title,
  url,
}) => ({
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
async function getCovisitedItems({ covisits }) {
  // covisits as related items
  const body = covisits.flatMap(({ link }) => {
    const [route, slug] = link.split("/");
    const source = getSourceByRoute(route);
    if (!(slug && source)) {
      logger.error(`Unknown covisit : ${link}`);
      return [];
    } else {
      return [{ index }, getSearchBody({ slug, source })];
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
    .map(({ _source }) => mapSource("covisits")(_source))
    .slice(0, MAX_RESULTS);

  return covisitedItems;
}

// use search based on item title : More Like This & Semantic
async function getSearchBasedItems({ title, settings }) {
  const relatedItemBody = getRelatedItemsBody({ settings, sources });
  const requestBodies = [{ index }, relatedItemBody];

  const query_vector = await vectorizeQuery(title.toLowerCase()).catch(
    (error) => {
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
      .map(({ _source }) => mapSource("search")(_source))
  );
}

// get related items, depending on : covisits present & non empty and A/B testing ratio
async function getRelatedItems({ title, settings, slug, covisits }) {
  const useCovisits = Math.random() < abRatio;

  const covisitedItems =
    covisits && useCovisits ? await getCovisitedItems({ covisits, slug }) : [];

  const searchBasedItems =
    covisitedItems.length < MAX_RESULTS
      ? await getSearchBasedItems({ settings, slug, title })
      : [];

  const relatedItems = covisitedItems
    .concat(searchBasedItems)
    // avoid elements already visible within the item as fragments
    .filter((item) =>
      slug.includes("#") ? !item.slug.startsWith(slug.split("#")[0]) : true
    )
    // only returning sources of interest
    .filter(({ source }) => sources.includes(source))
    // add reduce to drop duplicates using ids
    .slice(0, MAX_RESULTS);

  console.log(relatedItems);

  return relatedItems;
}

module.exports = {
  getRelatedItems,
};
