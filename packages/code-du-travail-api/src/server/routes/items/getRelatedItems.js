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

// ratio for A/B testing between covisit and search based related items (60% to compensate lack of covisits)
const abRatio = 0.6;

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
function mapSource(reco, source) {
  return (({
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
  }))(source);
}

async function getRelatedItems({ title, settings, slug, covisits }) {
  const useCovisit = Math.random() < abRatio;

  if (covisits && useCovisit) {
    // covisits as related items
    const body = covisits
      .map(({ link }) => {
        const source = getSourceByRoute(link.split("/")[0]);
        const slug = link.split("/")[1];
        if (!(slug && source)) {
          logger.error(`Unknown covisit : ${link}`);
          return [];
        } else {
          return [{ index }, getSearchBody({ slug, source })];
        }
      })
      .flat();

    const esCovisits = await elasticsearchClient
      .msearch({
        body,
      })
      .then((resp) =>
        resp.body.responses
          .map((r) => r.hits.hits[0])
          // deal with errors
          .filter((r) => r)
      )
      .catch((err) => {
        logger.error(
          "Error when querying covisits : " + JSON.stringify(err.meta.body)
        );
        return [];
      });

    const covisitedItems = esCovisits
      .filter(({ _source }) => !_source.slug.startsWith(slug.split("#")))
      // only returning sources of interest
      .filter(({ _source: { source } }) => sources.includes(source))
      // we filter fields and add some info about recommandation type for evaluation purpose
      .map(({ _source }) => mapSource("covisits", _source))
      .slice(0, MAX_RESULTS);

    return covisitedItems;
  } else {
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
    const [rootSlug] = slug.split("#");

    return (
      utils
        .mergePipe(fullTextHits, semanticHits, MAX_RESULTS)
        .filter(({ _source }) => !_source.slug.startsWith(rootSlug))
        // we filter fields and add some info about recommandation type for evaluation purpose
        .map(({ _source }) => mapSource("search", _source))
    );
  }
}

module.exports = {
  getRelatedItems,
};
