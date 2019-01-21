function getSearchBody({ query, size, excludeSources = [] }) {
  return {
    size: size,
    _source: ["title", "source", "slug", "anchor", "url"],
    query: {
      bool: {
        must_not: excludeSources.map(source => ({
          query_string: {
            default_field: "source",
            query: source.trim()
          }
        })),
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
                }
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
          }
        ]
      }
    },
    highlight: {
      order: "score",
      pre_tags: ["<mark>"],
      post_tags: ["</mark>"],
      fragment_size: 40,
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

module.exports = getSearchBody;
