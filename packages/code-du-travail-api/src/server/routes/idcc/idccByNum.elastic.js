function getIdccByNumBody({ query }) {
  return {
    size: 1,
    _source: ["id", "title", "url", "idcc", "slug"],
    query: {
      bool: {
        filter: [
          {
            term: {
              source: "conventions_collectives"
            }
          },
          {
            term: {
              idcc: query
            }
          }
        ]
      }
    }
  };
}

module.exports = getIdccByNumBody;
