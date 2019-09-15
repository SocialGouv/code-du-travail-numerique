export const themesMapping = {
  properties: {
    // The local document slug
    slug: {
      type: "keyword"
    },
    position: {
      type: "integer"
    },
    title: {
      type: "text",
      analyzer: "french",
      fields: {
        french_with_synonyms: {
          type: "text",
          analyzer: "french_with_synonyms"
        }
      }
    }
  }
};
