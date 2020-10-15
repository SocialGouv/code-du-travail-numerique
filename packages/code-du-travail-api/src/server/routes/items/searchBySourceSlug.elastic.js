function getSearchBody({ source, slug }) {
  return {
    _source: [
      "action", // outils
      "breadcrumbs",
      "categories", // thematic files
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
      "referencedTexts", // service-public, ministere-travail
      "slug", // outils
      "tags", // code-du-travail
      "title",
      "title_vector", // otherwise we can search for related items ?
      "url",
      "idcc",
      "date_publi", // convention-collective
      "answers", // contributions
      "refs", // thematic file
      "references",
      "contents", // editorial_content
      "folder", // editorial_content
      "cdtnId",
      "covisits",
      "source",
    ],
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
    size: 1,
  };
}

module.exports = getSearchBody;
