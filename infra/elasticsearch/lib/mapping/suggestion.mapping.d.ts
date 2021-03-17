export declare const suggestionMapping: {
    properties: {
        ranking: {
            type: string;
        };
        title: {
            analyzer: string;
            fields: {
                prefix: {
                    analyzer: string;
                    type: string;
                };
            };
            norms: boolean;
            search_analyzer: string;
            type: string;
        };
    };
};
