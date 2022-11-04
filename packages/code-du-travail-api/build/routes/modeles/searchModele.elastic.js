function getModeleBody() {
    return {
        _source: [
            "title",
            "slug",
            "description",
            "source",
            "breadcrumbs",
            "cdtnId"
        ],
        query: {
            bool: {
                filter: [
                    {
                        term: {
                            source: "modeles_de_courriers"
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
        size: 1000
    };
}
module.exports = getModeleBody;

//# sourceMappingURL=searchModele.elastic.js.map