function getSearchBody({ source, slug }) {
  return {
    size: 1,
    query: {
      bool: {
        must: {
          match: { source }
        },
        filter: { term: { slug } }
      }
    },
    _source: [
      "title",
      "url",
      "html",
      "raw", // service-public
      "slug", // outils
      "date_debut", // code-du-travail
      "date_fin", // code-du-travail
      "date",
      "slug", // outils
      "path", // code-du-travail
      "id", // idcc, kali
      "tags", // code-du-travail
      "description", // modele de courrier
      "filename", // filename
      "author" // faq
    ]
  };
}

module.exports = getSearchBody;
