import { Agreement } from "src/modules/outils/indemnite-depart/types";

export type ApiEnterpriseData = {
  entreprises: Enterprise[] | undefined;
};

export type MatchingEtablissement = {
  siret: string;
  address: string;
  activitePrincipale?: string;
  nomCommercial?: string;
};

export type Enterprise = {
  activitePrincipale?: string;
  conventions: Agreement[];
  /**
   * Vrai si au moins un établissement de l'entité a déclaré « aucune
   * convention collective » (code IDCC factice 9999). Ce code est
   * retiré de `conventions` ; ce drapeau pilote l'affichage des bandeaux.
   */
  hasEstablishmentWithoutConvention?: boolean;
  etablissements: number;
  highlightLabel: string;
  label: string;
  matching: number;
  simpleLabel: string;
  siren: string;
  siret: string;
  address: string;
  firstMatchingEtablissement?: MatchingEtablissement;
  matchingEtablissement?: MatchingEtablissement;
  matchingEtablissementCount: number;
};
