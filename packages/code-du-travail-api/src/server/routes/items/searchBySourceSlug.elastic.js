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
      "slug", // outils
      "date_debut", // code-du-travail
      "date_fin", // code-du-travail
      "date",
      "refs", // fiches SP/MT
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
