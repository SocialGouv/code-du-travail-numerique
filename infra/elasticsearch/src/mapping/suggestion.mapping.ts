export const suggestionMapping = {
  properties: {
    ranking: {
      type: "rank_feature",
    },
    title: {
      analyzer: "autocomplete",
      fields: {
        prefix: {
          analyzer: "sugg_prefix",
          type: "text",
        },
      },
      // normalization set to false in order to preserve
      // scores regardless of the size of the matching suggestions
      norms: false,

      search_analyzer: "autocomplete_search",

      type: "text",
    },
  },
};
