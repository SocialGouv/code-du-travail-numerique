export declare const documentMapping: {
    properties: {
        action: {
            type: string;
        };
        answer: {
            properties: {
                answer: {
                    type: string;
                };
                question: {
                    type: string;
                };
                references: {
                    properties: {
                        category: {
                            type: string;
                        };
                        url: {
                            type: string;
                        };
                        value: {
                            type: string;
                        };
                    };
                };
                slug: {
                    type: string;
                };
                theme: {
                    type: string;
                };
            };
        };
        ape: {
            analyzer: string;
            type: string;
        };
        articlesByTheme: {
            properties: {
                articles: {
                    properties: {
                        cid: {
                            type: string;
                        };
                        content: {
                            type: string;
                        };
                        id: {
                            type: string;
                        };
                    };
                };
                bloc: {
                    type: string;
                };
            };
        };
        breadcrumbs: {
            properties: {
                label: {
                    type: string;
                };
                slug: {
                    type: string;
                };
            };
        };
        categories: {
            enabled: boolean;
        };
        cdtnId: {
            type: string;
        };
        children: {
            properties: {
                label: {
                    type: string;
                };
                slug: {
                    type: string;
                };
            };
        };
        contents: {
            enabled: boolean;
        };
        covisits: {
            properties: {
                count: {
                    type: string;
                };
                link: {
                    type: string;
                };
            };
        };
        description: {
            type: string;
        };
        effectif: {
            type: string;
        };
        excludeFromSearch: {
            type: string;
        };
        folder: {
            type: string;
        };
        icon: {
            type: string;
        };
        intro: {
            type: string;
        };
        isPublished: {
            type: string;
        };
        metaDescription: {
            type: string;
        };
        nbArticles: {
            properties: {
                vigueurEtendu: {
                    type: string;
                };
                vigueurNonEtendu: {
                    type: string;
                };
            };
        };
        nbTextes: {
            type: string;
        };
        num: {
            fields: {
                text: {
                    type: string;
                };
            };
            type: string;
        };
        path: {
            analyzer: string;
            type: string;
        };
        populars: {
            properties: {
                title: {
                    type: string;
                };
            };
        };
        position: {
            type: string;
        };
        publishedAt: {
            type: string;
        };
        refs: {
            properties: {
                slug: {
                    type: string;
                };
                source: {
                    type: string;
                };
                title: {
                    type: string;
                };
            };
        };
        shortTitle: {
            fields: {
                french: {
                    analyzer: string;
                    search_analyzer: string;
                    type: string;
                };
            };
            type: string;
        };
        slug: {
            type: string;
        };
        source: {
            type: string;
        };
        split: {
            type: string;
        };
        synonymes: {
            fields: {
                french: {
                    analyzer: string;
                    search_analyzer: string;
                    type: string;
                };
            };
            type: string;
        };
        tags: {
            analyzer: string;
            fields: {
                keywords: {
                    analyzer: string;
                    type: string;
                };
            };
            type: string;
        };
        text: {
            fields: {
                french: {
                    analyzer: string;
                    type: string;
                };
                french_with_synonyms: {
                    analyzer: string;
                    type: string;
                };
            };
            type: string;
        };
        theme: {
            type: string;
        };
        themes: {
            type: string;
        };
        title: {
            fields: {
                article_id: {
                    analyzer: string;
                    type: string;
                };
                french: {
                    analyzer: string;
                    search_analyzer: string;
                    type: string;
                };
                french_with_synonyms: {
                    analyzer: string;
                    type: string;
                };
            };
            type: string;
        };
        title_vector: {
            dims: number;
            type: string;
        };
        url: {
            type: string;
        };
        variants: {
            type: string;
        };
    };
};
