# Code du travail - API (@cdt/api)

API permettant d'intérroger les différentes sources de données relatives au Code du travail numérique.

## Usage

### Local dev

```sh
export ELASTICSEARCH_URL=http://127.0.0.1:9200
yarn dev
```

### Docker image

Get the `@cdt/api` image from the [Social Gitlab Registry](https://gitlab.factory.social.gouv.fr/SocialGouv/code-du-travail-numerique/container_registry)

```sh
$ docker run --rm \
    --name cdtn_api \
    -p 1337:1337 \
    registry.gitlab.factory.social.gouv.fr/socialgouv/code-du-travail-numerique/api:<commit hash>
$ curl http://localhost:1337/api/v1/version

# With options

$ docker run --rm \
    --name cdtn_api \
    -p 1337:80 \
    -e PORT=80 \
    -e ELASTICSEARCH_LOG_LEVEL="info" \
    -e ELASTICSEARCH_URL="http://elasticsearch:9200" \
    -e NLP_URL=https://serving-ml-preprod.dev.fabrique.social.gouv.fr/ \
    -e VERSION="foo" \
    registry.gitlab.factory.social.gouv.fr/socialgouv/code-du-travail-numerique/api:<commit hash>
$ curl http://localhost:1337/api/v1/version
```

### Local build

```sh
# You need a parent monorepo image !
# You can download it from our registry
$ docker pull registry.gitlab.factory.social.gouv.fr/socialgouv/code-du-travail-numerique:<commit hash>
$ docker tag registry.gitlab.factory.social.gouv.fr/socialgouv/code-du-travail-numerique:<commit hash> cdtn_master:local

# Or build it
# From where this README.md is :
$ docker build -t cdtn_master:local ../..

#

$ docker build -t cdtn_api:local --build-arg BASE_IMAGE=cdtn_master:local .
$ docker run --rm \
    --name cdtn_api \
    -p 1337:80 \
    -e PORT=80 \
    -e ELASTICSEARCH_LOG_LEVEL="info" \
    -e ELASTICSEARCH_URL="http://localhost:9200" \
    -e VERSION="local" \
    cdtn_api:local

$ curl http://localhost:1337/api/v1/version
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
