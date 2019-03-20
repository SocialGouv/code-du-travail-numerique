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
      "author", // faq
      "date",
      "date_debut", // code-du-travail
      "date_fin", // code-du-travail
      "description", // modele de courrier
      "filename", // filename
      "html",
      "id", // idcc, kali
      "path", // code-du-travail
      "raw", // service-public
      "references_juridiques", // service-public, ministere-travail
      "slug", // outils
      "tags", // code-du-travail
      "title",
      "url"
    ]
  };
}

module.exports = getSearchBody;
