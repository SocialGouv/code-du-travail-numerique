function getIdccByNumBody({ query }) {
  return {
    size: 1,
    _source: ["id", "title", "url", "idcc", "slug"],
    query: {
      bool: {
        filter: [
          {
            term: {
              source: "kali"
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
