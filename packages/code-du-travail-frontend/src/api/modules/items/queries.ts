export const getSearchBySourceSlugBody = ({
  source,
  slug,
}: {
  source: any;
  slug: string;
}) => {
  return {
    _source: [
      "action", // outils
      "breadcrumbs",
      "categories", // thematic files
      "date",
      "dateDebut", // code-du-travail
      "description", // modele de courrier,
      "filesize", // modele de courrier, informations
      "fileUrl", // informations
      "filename", // modele de courrier
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
      "url",
      "idcc",
      "date_publi", // convention-collective
      "answers", // contributions
      "refs", // thematic file
      "references",
      "contents", // editorial_content
      "folder", // editorial_content
      "cdtnId",
      "source",
      "highlight", // convention-collective,
      "sectionDisplayMode",
      "dismissalProcess",
      "meta_title",
      "type",
      "content", // pour les contributions génériques et conventionnelles
      "ccSupported", // pour les contributions génériques et conventionnelles
      "ccUnextended", // pour les contributions génériques et conventionnelles
      "messageBlockGenericNoCDT", // pour les contributions génériques et conventionnelles
      "messageBlockGenericNoCDTUnextendedCC", // pour les contributions génériques et conventionnelles
      "ccnSlug", // pour une contribution conventionnelle
      "ccnShortTitle", // pour une contribution conventionnelle
      "linkedContent", // pour les contributions
      "messageBlock", // pour les contributions
      "metas", // pour les contributions
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

export const getDocumentByIdsBody = (values: string[]) => {
  return {
    query: {
      bool: {
        should: [
          {
            ids: {
              type: "_doc",
              values,
            },
          },
        ],
      },
    },
    size: 10,
  };
};

export const getRelatedItemsBody = ({
  settings,
  size = 10,
  sources = [],
}: {
  settings: any;
  size?: number;
  sources: any[];
}): any => {
  return {
    _source: [
      "title",
      "source",
      "slug",
      "description",
      "url",
      "action",
      "icon",
      "cdtnId",
    ],
    query: {
      bool: {
        filter: [
          { term: { excludeFromSearch: false } },
          { term: { isPublished: true } },
          {
            bool: {
              should: sources.map((source) => ({ term: { source } })),
            },
          },
        ],
        must: {
          more_like_this: {
            fields: ["title", "text"],
            like: settings,
            max_query_terms: 12,
            min_term_freq: 1,
          },
        },
      },
    },
    size,
  };
};
