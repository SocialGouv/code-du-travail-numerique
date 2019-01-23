function getRelatedDocumentBody({ themes, id }) {
  return {
    size: 0,
    aggregations: {
      bySource: {
        terms: {
          field: "source"
        },
        aggs: {
          bySource: {
            top_hits: {
              size: 2,
              _source: ["title", "slug", "source", "path", "filename"]
            }
          }
        }
      }
    },
    _source: ["title", "source", "slug", "anchor"],
    query: {
      bool: {
        must_not: {
          term: {
            _id: id
          }
        },
        must: [
          {
            bool: {
              should: themes.reduce(
                (state, theme) =>
                  state.concat(
                    {
                      match: {
                        "tags.keywords": `themes:${theme}`
                      }
                    },
                    {
                      match: {
                        themes: theme
                      }
                    }
                  ),
                []
              )
            }
          }
        ]
      }
    }
  };
}

module.exports = getRelatedDocumentBody;
