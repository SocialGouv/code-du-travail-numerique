import { ElasticAgreement } from "@socialgouv/cdtn-types";

export type ApiEnterpriseData = {
  entreprises: Enterprise[] | undefined;
};

export type MatchingEtablissement = {
  siret: string;
  address: string;
};

export type Enterprise = {
  activitePrincipale?: string;
  conventions: EnterpriseAgreement[];
  complements: {
    liste_idcc: string[];
  };
  etablissements: number;
  highlightLabel: string;
  label: string;
  matching: number;
  simpleLabel: string;
  siren: string;
  address?: string;
  firstMatchingEtablissement?: MatchingEtablissement;
};

export type EnterpriseAgreement = Pick<
  ElasticAgreement,
  "id" | "contributions" | "num" | "shortTitle" | "title" | "url" | "slug"
>;
