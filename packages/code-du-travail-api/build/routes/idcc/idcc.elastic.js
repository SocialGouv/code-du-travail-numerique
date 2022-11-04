const { SOURCES  } = require("@socialgouv/cdtn-sources");
function getIdccBody({ query , idccQuery  }) {
    return {
        _source: [
            "id",
            "title",
            "shortTitle",
            "url",
            "num",
            "slug",
            "effectif",
            "cdtnId",
            "highlight"
        ],
        query: {
            bool: {
                filter: [
                    {
                        term: {
                            source: SOURCES.CCN
                        }
                    },
                    {
                        term: {
                            isPublished: true
                        }
                    }
                ],
                must: {
                    bool: {
                        should: [
                            // in case of idcc search, we want to boost exact match
                            idccQuery ? {
                                term: {
                                    num: {
                                        boost: 10,
                                        value: idccQuery
                                    }
                                }
                            } : undefined,
                            {
                                match: {
                                    "shortTitle.french": {
                                        boost: ".9",
                                        fuzziness: "1",
                                        query: `${query}`
                                    }
                                }
                            },
                            {
                                match_phrase_prefix: {
                                    "num.text": {
                                        query: `${query}`
                                    }
                                }
                            },
                            {
                                match_phrase_prefix: {
                                    "synonymes.french": {
                                        query: `${query}`
                                    }
                                }
                            },
                            {
                                match_phrase_prefix: {
                                    "title.french": {
                                        query: `${query}`
                                    }
                                }
                            }
                        ]
                    }
                },
                should: {
                    rank_feature: {
                        field: "effectif",
                        log: {
                            scaling_factor: 1
                        }
                    }
                }
            }
        },
        size: 50
    };
}
module.exports = getIdccBody;

//# sourceMappingURL=idcc.elastic.js.map