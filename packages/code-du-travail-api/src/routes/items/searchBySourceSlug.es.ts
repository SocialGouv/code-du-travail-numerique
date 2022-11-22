export const getSearchBySourceSlugBody = ({
  source,
  slug,
}: {
  source: any;
  slug: string;
}): any => {
  return {
    _source: [
      "action", // outils
      "breadcrumbs",
      "categories", // thematic files
      "date",
      "dateDebut", // code-du-travail
      "description", // modele de courrier,
      "filesize", // modele de courrier, informations
      "fileUrl", // modele de courrier, informations
      "imgUrl",
      "intro",
      "html",
      "icon", // outils
      "id",
      "notaHtml",
      "metaDescription",
      "populars", // dossiers
      "sections", // dossiers
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
      "highlight", // convention-collective,
      "sectionDisplayMode",
      "dismissalProcess",
      "meta_title",
      "type",
    ],
    query: {
      bool: {
        filter: [
          { term: { source } },
          { term: { slug } },
          { term: { isPublished: true } },
        ],
      },
    },
    size: 1,
  };
};
