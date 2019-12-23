export const themesMapping = {
  properties: {
    icon: { type: "keyword" },
    children: {
      properties: {
        title: { type: "text" },
        slug: { type: "text" }
      }
    },
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
