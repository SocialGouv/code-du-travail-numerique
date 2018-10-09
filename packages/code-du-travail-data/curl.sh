# Temporary file that shows how to retrieve data from elasticsearch with curl.

# ---------------------------------------------------------------------------------------------------

# Cluster health check.
$ curl -XGET 'localhost:9200/_cat/health?v'

# List of nodes in the cluster.
$ curl -XGET 'localhost:9200/_cat/nodes?v'

# List of all indexes (indices).
curl -XGET 'localhost:9200/_cat/indices?v'

# Get information about one index (also list synonyms etc.).
curl -XGET 'http://localhost:9200/code_du_travail_numerique/?pretty'

# Retrieve mapping definitions for an index or type.
curl -XGET 'http://localhost:9200/code_du_travail_numerique/_mapping/?pretty'

# Search explicitly for documents of a given type within the code_du_travail index.
curl -XGET 'http://localhost:9200/code_du_travail_numerique/_search?pretty'

# ---------------------------------------------------------------------------------------------------

# Match all of the documents in the index.
curl -H "Content-Type: application/json" -XGET 'http://localhost:9200/code_du_travail_numerique/code_du_travail_numerique/_search?pretty' -d '{
  "query": {
    "match_all": {}
  }
}'

# Find by _id
curl -XGET 'http://localhost:9200/code_du_travail_numerique/code_du_travail_numerique/2oeWxmQBNQ4Yw-wXdU_k?pretty'

# Use the URI request query.
curl -XGET 'http://localhost:9200/code_du_travail_numerique/code_du_travail_numerique/_search?q=title:L1141&pretty'

# Same as above with the query DSL.
curl -H "Content-Type: application/json" -XGET 'http://localhost:9200/code_du_travail_numerique/code_du_travail_numerique/_search?pretty' -d '{
  "query": {
    "query_string": { "query": "title:L1141" }
  }
}'

# With `_version` of the document.
curl -H "Content-Type: application/json" -XGET 'http://localhost:9200/code_du_travail_numerique/code_du_travail_numerique/_search?pretty' -d '{
  "version": true,
  "query": {
    "query_string": { "query": "title:L1141" }
  }
}'

# With `min_score`.
curl -H "Content-Type: application/json" -XGET 'http://localhost:9200/code_du_travail_numerique/code_du_travail_numerique/_search?pretty' -d '{
  "min_score": 8,
  "query": {
    "query_string": { "query": "title:L1141" }
  }
}'

# Hide source.
curl -H "Content-Type: application/json" -XGET 'http://localhost:9200/code_du_travail_numerique/code_du_travail_numerique/_search?pretty' -d '{
  "_source": false,
  "query": {
    "query_string": { "query": "title:L1141" }
  }
}'

# Filter source fields.
curl -H "Content-Type: application/json" -XGET 'http://localhost:9200/code_du_travail_numerique/code_du_travail_numerique/_search?pretty' -d '{
  "_source": ["title", "text"],
  "query": {
    "query_string": { "query": "title:L1141" }
  }
}'

# ---------------------------------------------------------------------------------------------------

# Term query: matches the document that has a term in a given field - the exact, not analyzed term.
# Search for 'l1141' in lowercase instead of 'L1141': because 'L1141' becomes 'l1141' after analysis.
curl -H "Content-Type: application/json" -XGET 'http://localhost:9200/code_du_travail_numerique/code_du_travail_numerique/_search?pretty' -d '{
  "query": {
    "term": { "title": "l1141" }
  }
}'

# ---------------------------------------------------------------------------------------------------

# Test default analyzers.

curl -H "Content-Type: application/json" -XGET 'http://localhost:9200/_analyze?pretty' -d '{
  "analyzer": "english",
  "text": "Crime and Punishment"
}'

curl -H "Content-Type: application/json" -XGET 'http://localhost:9200/_analyze?pretty' -d '{
  "analyzer": "keyword",
  "text": "R1227-7"
}'

# Test custom analyzers.

curl -H "Content-Type: application/json" -XGET 'http://localhost:9200/code_du_travail_numerique/_analyze?pretty' -d '{
  "analyzer": "french_stemmed",
  "text": "CSP : quelle est la procédure à faire dans ce cas là ?"
}'

curl -H "Content-Type: application/json" -XGET 'http://localhost:9200/code_du_travail_numerique/_analyze?pretty' -d '{
  "analyzer": "french_exact",
  "text": "CSP : quelle est la procédure à faire dans ce cas là ?"
}'

curl -H "Content-Type: application/json" -XGET 'http://localhost:9200/code_du_travail_numerique/_analyze?pretty' -d '{
  "analyzer": "shingle",
  "text": "CSP : quelle est la procédure à faire dans ce cas là ?"
}'

curl -H "Content-Type: application/json" -XGET 'http://localhost:9200/code_du_travail_numerique/_analyze?pretty' -d '{
  "field": "path",
  "text": "/Santé Sécurité/Sécurité: Contrôle/Pénal/Infractions personne autre que employeur"
}'

# ---------------------------------------------------------------------------------------------------

# Filter by tag.

curl -H "Content-Type: application/json" -XGET 'http://localhost:9200/code_du_travail_numerique/code_du_travail_numerique/_search?pretty' -d '{
    "query": {
        "bool": {
            "must": {
                "match": {
                    "all_text": "interentreprises"
                }
            },
            "filter": {
                "term": {"path": "/Santé Sécurité/Sécurité: Contrôle/Pénal/Infractions règles femmes maternité"}
            }
        }
    }
}'

# Find R1227-7.

curl -H "Content-Type: application/json" -XGET 'http://localhost:9200/code_du_travail_numerique/code_du_travail_numerique/_search?pretty' -d '{
  "query": {
    "term": { "title.whitespace": "R1227-7" }
  }
}'

# Fetch R1227-7 by its tag.

curl -H "Content-Type: application/json" -XGET 'http://localhost:9200/code_du_travail_numerique/code_du_travail_numerique/_search?pretty' -d '{
  "query": {
    "term": {"path": "/Contrat de travail/Embauche/Registre Unique du Personnel (RUP)/Sanction"}
  }
}'

# ---------------------------------------------------------------------------------------------------

# Count all tags

curl -H "Content-Type: application/json" -XGET 'http://localhost:9200/code_du_travail_numerique/code_du_travail_numerique/_search?pretty' -d '{
  "size": 0,
  "aggs": {
    "count_tags": {
      "cardinality": {
        "field": "path"
      }
    }
  }
}'

# List all tags
# https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-terms-aggregation.html
# https://qbox.io/blog/how-to-download-all-unique-terms-field-elasticsearch

curl -H "Content-Type: application/json" -XGET 'http://localhost:9200/code_du_travail_numerique/code_du_travail_numerique/_search?pretty' -d '{
  "size": 0,
  "aggs": {
    "distinct_tags": {
      "terms": {
        "field": "path",
        "size": 100000
      }
    }
  }
}'
