function getSearchBody({ source, slug }) {
  return {
    size: 1,
    query: {
      bool: {
        must: [
          {
            match: { source }
          },
          {
            match: { slug }
          }
        ]
      }
    },
    _source: [
      "author", // faq
      "date",
      "date_debut", // code-du-travail
      "date_fin", // code-du-travail
      "description", // modele de courrier
      "filename", // filename
      "intro",
      "html",
      "id", // idcc, kali
      "path", // code-du-travail
      "raw", // service-public
      "references_juridiques", // service-public, ministere-travail
      "slug", // outils
      "tags", // code-du-travail
      "title",
      "url",
      "breadcrumbs"
    ]
  };
}

module.exports = getSearchBody;
