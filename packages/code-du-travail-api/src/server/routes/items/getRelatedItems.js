const { SOURCES, getSourceByRoute } = require("@socialgouv/cdtn-sources");
const { DOCUMENTS } = require("@cdt/data/indexing/esIndexName");
const { vectorizeQuery } = require("@cdt/data/indexing/vectorizer");

const elasticsearchClient = require("../../conf/elasticsearch.js");
const getSearchBody = require("./searchBySourceSlug.elastic");
const getSemBody = require("../search/search.sem");
const utils = require("../search/utils");
const getRelatedItemsBody = require("./relatedItems.elastic");
const { logger } = require("../../utils/logger");

const MAX_RESULTS = 5;

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX || "cdtn";
const index = `${ES_INDEX_PREFIX}_${DOCUMENTS}`;

async function getRelatedItems({ title, settings, slug, covisits }) {
  // console.log(covisits);
  if (covisits) {
    // covisits as related items
    // console.log(covisits);

    const body = covisits
      .map(({ link }) => {
        const source = getSourceByRoute(link.split("/")[0]);
        const slug = link.split("/")[1];
        // console.log({ source, slug });
        return [{ index }, getSearchBody({ slug, source })];
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
      );

    const covisitedItems = esCovisits
      // do we really want this ?
      // .filter(({ _source }) => !_source.slug.startsWith(rootSlug))
      .map(({ _source }) => _source);

    // console.log(covisitedItems);
    return covisitedItems;
  } else {
    // standard related items :
    const sources = [
      SOURCES.TOOLS,
      SOURCES.SHEET_SP,
      SOURCES.SHEET_MT,
      SOURCES.LETTERS,
      SOURCES.CONTRIBUTIONS,
      SOURCES.EXTERNALS,
    ];

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

    return utils
      .mergePipe(fullTextHits, semanticHits, MAX_RESULTS)
      .filter(({ _source }) => !_source.slug.startsWith(rootSlug))
      .map(({ _source }) => _source);
  }
}

module.exports = {
  getRelatedItems,
};
