function getDocumentByUrlBody({ url  }) {
    return {
        _source: [
            "date",
            "raw",
            "intro",
            "sections",
            "source",
            "url"
        ],
        query: {
            bool: {
                filter: [
                    {
                        term: {
                            url
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
module.exports = getDocumentByUrlBody;

//# sourceMappingURL=searchByUrl.elastic.js.map