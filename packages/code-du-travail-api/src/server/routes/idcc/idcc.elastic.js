function getIdccBody({ query }) {
  return {
    size: 1000,
    _source: ["title", "url", "ape", "idcc"],
    query: {
      bool: {
        filter: [
          {
            term: {
              source: "kali"
            }
          }
        ],
        must: [
          // Fuziness is ignored with multi_match's cross_fields.
          // https://github.com/elastic/elasticsearch/issues/6866
          // Put multi_match clause in standby, use an inner bool with 2 should clauses instead.
          // {
          //   multi_match: {
          //     query: query,
          //     fields: [
          //       'all_text.french_stemmed',
          //       'all_text.french_exact',
          //     ],
          //     operator: 'and',
          //     cutoff_frequency: 0.0007,
          //     type: 'cross_fields',
          //   },
          {
            bool: {
              should: [
                {
                  match: {
                    "all_text.french_exact": {
                      query: query,
                      operator: "and",
                      cutoff_frequency: 0.0007,
                      fuzziness: "AUTO"
                    }
                  }
                },
                {
                  match: {
                    "all_text.french_stemmed": {
                      query: query,
                      operator: "and",
                      cutoff_frequency: 0.0007,
                      fuzziness: "AUTO"
                    }
                  }
                },
                [
                  {
                    match: {
                      ape: {
                        query
                      }
                    }
                  },
                  {
                    match_phrase_prefix: {
                      title: {
                        query
                      }
                    }
                  }
                ]
              ]
            }
          }
        ],
        should: [
          {
            multi_match: {
              query: query,
              fields: ["title.french_stemmed", "title.french_exact"],
              type: "most_fields",
              boost: 2000
            }
          },
          {
            match: {
              "all_text.shingle": {
                query: query,
                boost: 1500
              }
            }
          },
          {
            multi_match: {
              query: query,
              fields: ["path.french_stemmed", "path.french_exact"],
              type: "most_fields",
              boost: 500
            }
          },
          // Temporarily put "fonction publique" and "agent public" results in a less prominent position.
          // todo: add a disclaimer
          {
            query_string: {
              query:
                '(title.shingle:"fonction publique") OR (title.shingle:"agent public")',
              boost: -2000
            }
          },
          {
            match: {
              idcc: {
                query: parseInt(query, 10) || "",
                boost: 2000
              }
            }
          },
          {
            match: {
              title: {
                query: query,
                boost: 2000
              }
            }
          }
        ]
      }
    },
    highlight: {
      order: "score",
      pre_tags: ["<mark>"],
      post_tags: ["</mark>"],
      fragment_size: 200,
      fields: {
        "title.french_stemmed": {},
        "title.french_exact": {},
        "all_text.french_stemmed": {},
        "all_text.french_exact": {},
        "all_text.shingle": {},
        "path.french_stemmed": {},
        "path.french_exact": {}
      }
    }
  };
}

module.exports = getIdccBody;
