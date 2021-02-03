export const documentMapping = {
  properties: {
    // available for tools
    action: { type: "text" },

    answer: {
      properties: {
        answer: { type: "text" },
        question: { type: "text" },
        references: {
          properties: {
            category: { type: "keyword" },
            url: { type: "keyword" },
            value: { type: "text" },
          },
        },
        slug: { type: "keyword" },
        theme: { type: "text" },
      },
    },

    ape: {
      analyzer: "idcc_ape",
      type: "text",
    },

    articlesByTheme: {
      properties: {
        articles: {
          properties: {
            cid: { type: "keyword" },
            content: { type: "text" },
            id: { type: "keyword" },
          },
        },
        bloc: { type: "keyword" },
      },
    },

    // available for themes
    breadcrumbs: {
      properties: {
        label: { type: "text" },
        slug: { type: "keyword" },
      },
    },

    // only in dossiers
    categories: {
      enabled: false,
    },

    cdtnId: { type: "keyword" },

    // available for themes
    children: {
      properties: {
        label: { type: "text" },
        slug: { type: "text" },
      },
    },

    contents: {
      enabled: false,
    },

    covisits: {
      properties: {
        count: { type: "integer" },
        link: { type: "keyword" },
      },
    },

    description: { type: "text" },

    effectif: {
      type: "rank_feature",
    },

    excludeFromSearch: {
      type: "boolean",
    },

    folder: { type: "text" },

    // available for themes
    icon: { type: "keyword" },

    // available in editorial content
    intro: { type: "text" },

    isPublished: {
      type: "boolean",
    },

    metaDescription: { type: "text" },

    nbArticles: {
      properties: {
        vigueurEtendu: { type: "integer" },
        vigueurNonEtendu: { type: "integer" },
      },
    },

    nbTextes: { type: "integer" },

    num: {
      fields: {
        text: {
          type: "text",
        },
      },
      type: "keyword",
    },

    // Currently only available for `Code du travail`.
    path: {
      analyzer: "french",
      type: "text",
    },

    // only in dossiers
    populars: {
      properties: {
        title: { type: "text" },
      },
    },

    // available for themes
    position: { type: "keyword" },

    publishedAt: { type: "date" },

    // available for themes and highlights
    refs: {
      properties: {
        title: { type: "text" },
        url: { type: "keyword" },
      },
    },

    shortTitle: {
      fields: {
        french: {
          analyzer: "french_indexing",
          search_analyzer: "french",
          type: "text",
        },
      },
      type: "text",
    },

    // The local document slug
    slug: {
      type: "keyword",
    },

    // Indicates the origin of the document, e.g. 'code_du_travail', 'fiches_service_public' etc.
    source: {
      type: "keyword",
    },

    // Indicates wether the document is a split version of anothe one
    split: {
      type: "boolean",
    },

    // used for CC search
    synonymes: {
      fields: {
        french: {
          analyzer: "french_indexing",
          search_analyzer: "french",
          type: "text",
        },
      },
      type: "text",
    },

    // Currently only available for `Fiches service public`.
    tags: {
      analyzer: "french",
      fields: {
        keywords: {
          analyzer: "keyword",
          type: "text",
        },
      },
      type: "text",
    },

    text: {
      fields: {
        french: {
          analyzer: "french",
          type: "text",
        },
        french_with_synonyms: {
          analyzer: "french_with_synonyms",
          type: "text",
        },
      },
      type: "text",
    },

    theme: {
      type: "keyword",
    },

    themes: {
      type: "keyword",
    },

    title: {
      fields: {
        article_id: {
          analyzer: "article_id_analyzer",
          type: "text",
        },
        french: {
          analyzer: "french_indexing",
          search_analyzer: "french",
          type: "text",
        },
        french_with_synonyms: {
          analyzer: "french_with_synonyms",
          type: "text",
        },
      },
      type: "text",
    },

    title_vector: {
      dims: 512,
      type: "dense_vector",
    },
    // The source URL
    url: {
      type: "keyword",
    },
    // used in prequalifieds
    variants: {
      type: "text",
    },
  },
};
