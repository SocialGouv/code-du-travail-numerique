function getSearchByThemeBody({ slug }) {
  return {
    size: 100,
    _source: ["title", "source", "slug", "anchor", "url"],
    query: {
      bool: {
        must_not: {
          terms: {
            source: ["snippet", "themes"]
          }
        },
        must: [
          {
            bool: {
              should: [
                {
                  match: {
                    theme: {
                      query: slug
                    }
                  }
                }
              ]
            }
          }
        ]
      }
    }
  };
}

module.exports = getSearchByThemeBody;
