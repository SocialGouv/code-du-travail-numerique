// https://github.com/elastic/elasticsearch-js

const elasticsearch = require('elasticsearch')

const ELASTICSEARCH_URL = process.env.ELASTICSEARCH_URL || 'localhost:9200'
// Log level can be: info, debug or trace.
const ELASTICSEARCH_LOG_LEVEL = process.env.ELASTICSEARCH_LOG_LEVEL || 'trace'

const client = new elasticsearch.Client({
  host: ELASTICSEARCH_URL,
  log: ELASTICSEARCH_LOG_LEVEL,
})

module.exports = client
