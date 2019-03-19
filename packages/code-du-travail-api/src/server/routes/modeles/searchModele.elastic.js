function getModeleBody() {
  return {
    size: 1000,
    _source: ["title", "slug", "description", "editor", "filename"],
    query: {
      bool: {
        filter: [
          {
            term: {
              source: "modeles_de_courriers"
            }
          }
        ]
      }
    }
  };
}

module.exports = getModeleBody;
