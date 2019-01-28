const cdtn_document_mapping = {
  properties: {
    // Indicates the origin of the document, e.g. 'code_du_travail', 'fiches_service_public' etc.
    source: {
      type: "keyword"
    },
    // The local document slug
    slug: {
      type: "keyword"
    },
    // The source URL
    url: {
      type: "keyword"
    },
    // A field that concatenate `title` and `text` fields.
    all_text: {
      type: "text",
      analyzer: "french",
      store: true
    },
    title: {
      type: "text",
      analyzer: "french",
      search_analyzer: "french_indexing",
      fields: {
        french_stemmed: {
          type: "text",
          analyzer: "french_stemmed"
        }
      }
    },
    text: {
      type: "text",
      analyzer: "french"
    },
    // Currently only available for `Fiches service public`.
    tags: {
      type: "text",
      analyzer: "french",
      fields: {
        keywords: {
          type: "text",
          analyzer: "keyword"
        }
      }
    },
    // Currently only available for `Code du travail`.
    path: {
      type: "text",
      analyzer: "french"
    },
    themes: {
      type: "keyword"
    },
    idcc: {
      type: "keyword"
    },
    ape: {
      type: "text",
      analyzer: "idcc_ape"
    }
  }
};

module.exports = cdtn_document_mapping;
