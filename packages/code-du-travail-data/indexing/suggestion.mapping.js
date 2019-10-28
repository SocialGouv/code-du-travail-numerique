export const suggestionMapping = {
  properties: {
    ranking: {
      type: "rank_feature"
    },
    title: {
      type: "text",
      analyzer: "autocomplete",
      search_analyzer: "autocomplete_search",
      fields: {
        text_prefix: {
          type: "text",
          analyzer: "text_prefix"
        }
      }
    }
  }
};
