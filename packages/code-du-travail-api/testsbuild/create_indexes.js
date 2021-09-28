"use strict";

var _cdtnElasticsearch = require("@socialgouv/cdtn-elasticsearch");

var _elasticsearch = _interopRequireDefault(
  require("../server/conf/elasticsearch")
);

var _v = require("../server/routes/v1.prefix");

var _cdtn_documentData = _interopRequireDefault(
  require("./cdtn_document.data.json")
);

var _suggestions_data = _interopRequireDefault(
  require("./suggestions_data.json")
);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX || "cdtn_test";
const documentsIndexName = `${ES_INDEX_PREFIX}-${_v.CDTN_ADMIN_VERSION}_${_cdtnElasticsearch.DOCUMENTS}`;
const suggestionsIndexName = `${ES_INDEX_PREFIX}-${_v.CDTN_ADMIN_VERSION}_${_cdtnElasticsearch.SUGGESTIONS}`;

async function main() {
  await (0, _cdtnElasticsearch.version)({
    client: _elasticsearch.default,
  });
  await (0, _cdtnElasticsearch.createIndex)({
    client: _elasticsearch.default,
    indexName: documentsIndexName,
    mappings: _cdtnElasticsearch.documentMapping,
  });
  await (0, _cdtnElasticsearch.indexDocumentsBatched)({
    client: _elasticsearch.default,
    documents: _cdtn_documentData.default,
    indexName: documentsIndexName,
  });
  await (0, _cdtnElasticsearch.createIndex)({
    client: _elasticsearch.default,
    indexName: suggestionsIndexName,
    mappings: _cdtnElasticsearch.suggestionMapping,
  });
  await (0, _cdtnElasticsearch.indexDocumentsBatched)({
    client: _elasticsearch.default,
    documents: _suggestions_data.default,
    indexName: suggestionsIndexName,
  });
}

main();
