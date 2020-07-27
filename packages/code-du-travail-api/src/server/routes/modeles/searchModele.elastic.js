function getModeleBody() {
  return {
    _source: [
      "title",
      "slug",
      "description",
      "source",
      "breadcrumbs",
      "cdtnId",
    ],
    query: {
      bool: {
        filter: [
          {
            term: {
              source: "modeles_de_courriers",
            },
          },
        ],
      },
    },
    size: 1000,
  };
}

module.exports = getModeleBody;
