// https://github.com/elastic/elasticsearch-js

const elasticsearch = require('elasticsearch')

const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace',
})

module.exports = client
