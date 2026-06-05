import { Agreement } from "src/modules/outils/indemnite-depart/types";

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
  /**
   * Vrai si au moins un établissement de l'entité a déclaré « aucune
   * convention collective » (IDCC sentinelle 9999). La sentinelle est
   * retirée de `conventions` ; ce drapeau pilote l'affichage des bandeaux
   * d'information sur toutes les surfaces.
   */
  hasEstablishmentWithoutConvention?: boolean;
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
