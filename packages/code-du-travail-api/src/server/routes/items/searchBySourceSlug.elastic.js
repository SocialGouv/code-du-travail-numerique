function getSearchBody({ source, slug }) {
  return {
    size: 1,
    query: {
      bool: {
        filter: [
          {
            term: { source },
          },
          {
            term: { slug },
          },
        ],
      },
    },
    _source: [
      "asideContent", // thematic file
      "action", // outils
      "date",
      "dateDebut", // code-du-travail
      "description", // modele de courrier
      "filename", // modele de courrier
      "filesize", // modele de courrier
      "intro",
      "html",
      "icon", // outils
      "id",
      "notaHtml",
      "metaDescription", // dossiers
      "path", // code-du-travail
      "raw", // service-public
      "references_juridiques", // service-public, ministere-travail
      "slug", // outils
      "tags", // code-du-travail
      "title",
      "title_vector", // otherwise we can search for related items ?
      "url",
      "breadcrumbs",
      "idcc",
      "date_publi", // convention-collective
      "answers", // contributions
      "refs", // thematic file
    ],
  };
}

module.exports = getSearchBody;
