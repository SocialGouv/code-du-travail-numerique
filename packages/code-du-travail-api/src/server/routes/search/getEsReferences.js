const elasticsearchClient = require("../../conf/elasticsearch.js");
const getDocumentByUrlQuery = require("./getDocumentByUrlQuery");

const isInternalUrl = url => url.match(/^\//);

const index =
  process.env.ELASTICSEARCH_DOCUMENT_INDEX || "code_du_travail_numerique";

const makeHit = data => ({
  _index: index,
  _type: "_doc",
  _source: {
    source: "external",
    title: "",
    ...data
  }
});

const indexQuery = { index };

const flatten = arr => arr.reduce((a, c) => [...a, ...c], []);

// for a set of given urls, fetch related ES documents
const getEsReferences = async (refs = []) => {
  const queries =
    (refs &&
      flatten(
        refs
          .filter(ref => isInternalUrl(ref.url))
          .map(ref => getDocumentByUrlQuery(ref.url))
          .filter(Boolean)
          .map(query => [indexQuery, query])
      )) ||
    [];

  if (!queries.length) {
    return [];
  }

  // get all known urls results
  const response = await elasticsearchClient.msearch({
    body: [...queries]
  });

  const responses = response.body.responses.flatMap(r => r.hits.hits);

  // mix with non ES-results (ex: external)
  const hits = refs
    .map(ref => {
      if (isInternalUrl(ref.url)) {
        return responses.shift();
      }
      return makeHit(ref);
    })
    .filter(Boolean);

  return hits;
};

module.exports = getEsReferences;
