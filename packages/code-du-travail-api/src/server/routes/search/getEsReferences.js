const { getSourceByRoute } = require("@socialgouv/cdtn-sources");
const { DOCUMENTS } = require("@cdt/data/indexing/esIndexName");

const elasticsearchClient = require("../../conf/elasticsearch.js");
const getDocumentByUrlQuery = require("./getDocumentByUrlQuery");

const isInternalUrl = (url) => url.match(/^\//);

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX || "cdtn";
const index = `${ES_INDEX_PREFIX}_${DOCUMENTS}`;

const makeHit = (data) => ({
  _index: index,
  _source: {
    source: "external",
    title: "",
    ...data,
  },
  _type: "_doc",
});

const indexQuery = { index };

const flatten = (arr) => arr.reduce((a, c) => [...a, ...c], []);

// for a set of given urls, fetch related ES documents
const getEsReferences = async (refs = []) => {
  const queries =
    (refs &&
      refs
        .filter((ref) => isInternalUrl(ref.url))
        .map((ref) => getDocumentByUrlQuery(ref.url))
        .filter(Boolean)
        .reduce((state, query) => state.concat(indexQuery, query), [])) ||
    [];

  if (!queries.length) {
    return [];
  }

  // get all known urls results
  const response = await elasticsearchClient.msearch({
    body: [...queries],
  });

  const responses = flatten(response.body.responses.map((r) => r.hits.hits));
  // mix with non ES-results (ex: external, or no match)
  const hits = refs.map((ref) => {
    if (isInternalUrl(ref.url)) {
      const [, source, slug] = ref.url.split("/");
      const esReference = responses.find(
        (response) =>
          response._source.slug === slug &&
          response._source.source === getSourceByRoute(source)
      );
      if (esReference) {
        return esReference;
      }
    }
    return makeHit(ref);
  });
  return hits;
};

module.exports = getEsReferences;
