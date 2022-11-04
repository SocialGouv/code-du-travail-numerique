function getSearchBody({ source , slug  }) {
    return {
        _source: [
            "action",
            "breadcrumbs",
            "categories",
            "date",
            "dateDebut",
            "description",
            "filesize",
            "fileUrl",
            "imgUrl",
            "intro",
            "html",
            "icon",
            "id",
            "notaHtml",
            "metaDescription",
            "populars",
            "sections",
            "path",
            "raw",
            "referencedTexts",
            "slug",
            "tags",
            "title",
            "title_vector",
            "url",
            "idcc",
            "date_publi",
            "answers",
            "refs",
            "references",
            "contents",
            "folder",
            "cdtnId",
            "covisits",
            "source",
            "highlight"
        ],
        query: {
            bool: {
                filter: [
                    {
                        term: {
                            source
                        }
                    },
                    {
                        term: {
                            slug
                        }
                    },
                    {
                        term: {
                            isPublished: true
                        }
                    }
                ]
            }
        },
        size: 1
    };
}
module.exports = getSearchBody;

//# sourceMappingURL=searchBySourceSlug.elastic.js.map