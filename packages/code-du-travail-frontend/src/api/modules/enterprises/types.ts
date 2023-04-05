export type ApiEnterpriseData = {
  entreprises: Enterprise[] | undefined;
};

export type MatchingEtablissement = {
  siret: string;
  address: string;
};

export type Enterprise = {
  activitePrincipale?: string;
  conventions: Agreement[];
  etablissements: number;
  highlightLabel: string;
  label: string;
  matching: number;
  simpleLabel: string;
  siren: string;
  address?: string;
  firstMatchingEtablissement?: MatchingEtablissement;
};

export type Agreement = {
  id: string;
  num: number;
  shortTitle: string;
  slug?: string;
  title: string;
  url?: string;
  highlight?: {
    title: string;
    content: string;
    searchInfo?: string;
  };
};

export type Convention = {
  idcc: number;
  shortTitle: string;
  id: string;
  title: string;
  url?: string;
};

export type EnterpriseApiResponse = {
  entreprises?: (Omit<Enterprise, "conventions"> & {
    conventions: Convention[];
  })[];
};
