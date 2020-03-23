export const suggestionMapping = {
  properties: {
    ranking: {
      type: "rank_feature",
    },
    title: {
      type: "text",
      analyzer: "autocomplete",
      search_analyzer: "autocomplete_search",
      fields: {
        prefix: {
          type: "text",
          analyzer: "sugg_prefix",
        },
      },
      // normalization set to false in order to preserve
      // scores regardless of the size of the matching suggestions
      norms: false,
    },
  },
};
