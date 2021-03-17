/* eslint-disable @typescript-eslint/naming-convention */

export interface Document {
  readonly id: string;
  readonly action: string;

  readonly answer: {
    readonly answer: string;
    readonly question: string;
    readonly references: {
      readonly category: string;
      readonly url: string;
      readonly value: string;
    };
    readonly slug: string;
    readonly theme: string;
  };

  readonly ape: string;

  readonly articlesByTheme: {
    readonly articles: {
      readonly cid: string;
      readonly content: string;
      readonly id: string;
    };
    readonly bloc: string;
  };

  // available for themes
  readonly breadcrumbs: readonly {
    readonly label: string;
    readonly slug: string;
  }[];

  // only in dossiers
  readonly categories: unknown;

  readonly cdtnId: string;

  // available for themes
  readonly children: readonly {
    readonly label: string;
    readonly slug: string;
  }[];

  readonly contents: unknown;

  readonly covisits: {
    readonly count: number;
    readonly link: string;
  };

  readonly description: string;

  readonly effectif: number;

  readonly excludeFromSearch: boolean;

  readonly folder: string;

  // available for themes
  readonly icon: string;

  // available in editorial content
  readonly intro: string;

  readonly isPublished: boolean;

  readonly metaDescription: string;

  readonly nbArticles: {
    readonly vigueurEtendu: number;
    readonly vigueurNonEtendu: number;
  };

  readonly nbTextes: number;

  readonly num: string;

  // Currently only available for `Code du travail`.
  readonly path: string;

  // only in dossiers
  readonly populars: {
    readonly title: string;
  };

  // available for themes
  readonly position: string;

  readonly publishedAt: Date;

  // available for themes and highlights
  readonly refs: readonly {
    readonly slug: string;
    readonly source: string;
    readonly title: string;
  }[];

  readonly shortTitle: string;

  // The local document slug
  readonly slug: string;

  // Indicates the origin of the document, e.g. 'code_du_travail', 'fiches_service_public' etc.
  readonly source: string;

  // Indicates wether the document is a split version of anothe one
  readonly split: boolean;

  // used for CC search
  readonly synonymes: string;

  // Currently only available for `Fiches service public`.
  readonly tags: string;

  readonly text: string;

  readonly theme: string;

  readonly themes: string;

  readonly title: string;

  readonly title_vector: number[];
  // The source URL
  readonly url: string;
  // used in prequalifieds
  readonly variants: string;
}
