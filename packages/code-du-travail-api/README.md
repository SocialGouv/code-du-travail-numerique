# Code du travail - API (@cdt/api)

API permettant d'intérroger les différentes sources de données relatives au Code du travail numérique.

## Usage

### Local dev

Follow the steps [here](https://github.com/SocialGouv/cdtn-admin/tree/master/targets/export-elasticsearch#testing-in-real)

```sh
export ELASTICSEARCH_URL=http://127.0.0.1:9200
yarn dev
```

### Local test elasticsearch

Run the command below:

```sh
yarn workspace @cdt/api test:search
```

## Debug search

Firstly, we have to run `kibana` thanks to this command:

```sh
docker-compose up kibana
```

Then, we need to follow document of `export-elasticsearch` to run it locally. Now, we can navigate to : <http://localhost:5601/app/dev_tools#/console>

We can run different query, such as below.

- To analyse an expression with analyzer

```json
GET cdtn-v1_documents/_analyze
{
  "analyzer": "french_with_synonyms",
  "text": ["assitantes maternelles"]
}
```

- To get settings

```json
GET cdtn-v1_documents/_settings
```

- To run a full text search

```json
GET cdtn-v1_documents/_search
{
  "_source": [
    "title",
    "source",
    "synonymes"
  ],
  "query": {
    "bool": {
      "filter": [
        {
          "term": {
            "excludeFromSearch": false
          }
        },
        {
          "term": {
            "isPublished": true
          }
        }
      ],
      "must": [
        {
          "bool": {
            "should": [
              {
                "multi_match": {
                  "boost": 0.1,
                  "fields": [
                    "text.french",
                    "title.french"
                  ],
                  "minimum_should_match": "1<99% 3<75% 6<30%",
                  "query": "nounou",
                  "type": "cross_fields"
                }
              },
              {
                "match": {
                  "text.french_with_synonyms": {
                    "query": "nounou"
                  }
                }
              },
              { // we add that to get synonyms from `conventions_collectives` from `kali-data`
                "match": {
                  "synonymes": {
                    "query": "nounou"
                  }
                }
              }
            ]
          }
        },
        {
          "bool": {
            "should": [
              {
                "bool": {
                  "must": [
                    {
                      "term": {
                        "source": "conventions_collectives"
                      }
                    },
                    {
                      "term": {
                        "contributions": true
                      }
                    },
                    {
                      "rank_feature": {
                        "boost": 10,
                        "field": "effectif"
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      ],
      "should": [
        {
          "match_phrase": {
            "title.french": {
              "boost": 2,
              "query": "__start__ nounou",
              "slop": 1
            }
          }
        },
        {
          "match_phrase": {
            "text.french": {
              "boost": 1.5,
              "query": "nounou"
            }
          }
        },
        {
          "match": {
            "title.french_with_synonyms": {
              "query": "nounou"
            }
          }
        },
        {
          "match": {
            "source": {
              "boost": 1.2,
              "query": "contributions"
            }
          }
        },
        {
          "match": {
            "source": {
              "boost": 1.1,
              "query": "outils"
            }
          }
        },
        {
          "match": {
            "source": {
              "boost": 1.1,
              "query": "modeles_de_courriers"
            }
          }
        }
      ]
    }
  },
  "size": 25
}
```

To get, the query above, we did a `console.log` in `src/routes/search/index.js` of `searches[DOCUMENTS_ES]`.

### Note

Documentation about synonyms can be found here: <https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-synonym-tokenfilter.html>.

In `cdtn-admin`, we have a folder `shared/elasticsearch` which contains `src/dataset/synonyms`. This folder is use to get synonyms used.

It also contains `src/dataset/stop_words` which is used to get stop words. Stop words are words that are not useful for the search.
