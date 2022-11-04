function getRelatedItemsBody({ settings , size =10 , sources =[]  }) {
    if (sources.length === 0) {
        throw new Error("[getRelatedItemsBody] sources should not be empty");
    }
    return {
        _source: [
            "title",
            "source",
            "slug",
            "description",
            "url",
            "action",
            "icon",
            "cdtnId"
        ],
        query: {
            bool: {
                filter: [
                    {
                        term: {
                            excludeFromSearch: false
                        }
                    },
                    {
                        term: {
                            isPublished: true
                        }
                    },
                    {
                        bool: {
                            should: sources.map((source)=>({
                                    term: {
                                        source
                                    }
                                }))
                        }
                    }
                ],
                must: {
                    more_like_this: {
                        fields: [
                            "title",
                            "text"
                        ],
                        like: settings,
                        max_query_terms: 12,
                        min_term_freq: 1
                    }
                }
            }
        },
        size
    };
}
module.exports = getRelatedItemsBody;

//# sourceMappingURL=relatedItems.elastic.js.map