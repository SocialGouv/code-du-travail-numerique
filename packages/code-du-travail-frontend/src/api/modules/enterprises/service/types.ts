export interface ApiRechercheEntrepriseResponse {
  results: Result[];
  total_results: number;
  page: number;
  per_page: number;
  total_pages: number;
}

interface Result {
  siren: string;
  nom_complet: string;
  nom_raison_sociale: string;
  sigle: any;
  nombre_etablissements: number;
  nombre_etablissements_ouverts: number;
  siege: Siege;
  date_creation: string;
  tranche_effectif_salarie: string;
  annee_tranche_effectif_salarie: string;
  date_mise_a_jour: string;
  categorie_entreprise: string;
  caractere_employeur: string;
  annee_categorie_entreprise: string;
  etat_administratif: string;
  nature_juridique: string;
  activite_principale: string;
  section_activite_principale: string;
  statut_diffusion: string;
  matching_etablissements: MatchingEtablissement[];
  dirigeants: Dirigeant[];
  finances: Finances;
  complements: Complements;
}

interface Siege {
  activite_principale: string;
  activite_principale_registre_metier: any;
  annee_tranche_effectif_salarie: string;
  adresse: string;
  caractere_employeur: string;
  cedex: any;
  code_pays_etranger: any;
  code_postal: string;
  commune: string;
  complement_adresse: string;
  date_creation: string;
  date_debut_activite: string;
  date_mise_a_jour: string;
  departement: string;
  distribution_speciale: any;
  est_siege: boolean;
  etat_administratif: string;
  geo_id: string;
  indice_repetition: any;
  latitude: string;
  libelle_cedex: any;
  libelle_commune: string;
  libelle_commune_etranger: any;
  libelle_pays_etranger: any;
  libelle_voie: string;
  liste_enseignes: string[];
  liste_finess: string[];
  liste_idcc: string[];
  liste_id_bio: string[];
  liste_rge: string[];
  liste_uai: string[];
  longitude: string;
  nom_commercial: any;
  numero_voie: string;
  region: string;
  siret: string;
  tranche_effectif_salarie: string;
  type_voie: string;
}

interface MatchingEtablissement {
  activite_principale: string;
  adresse: string;
  caractere_employeur: string;
  commune: string;
  est_siege: boolean;
  etat_administratif: string;
  geo_id: string;
  latitude: string;
  libelle_commune: string;
  liste_enseignes: string[];
  liste_finess: string[];
  liste_idcc: string[];
  liste_rge: string[];
  liste_uai: string[];
  longitude: string;
  nom_commercial: any;
  region: string;
  siret: string;
  tranche_effectif_salarie: string;
}

interface Dirigeant {
  nom: string;
  prenoms: string;
  annee_de_naissance: string;
  date_de_naissance: string;
  qualite: string;
  nationalite: string;
  type_dirigeant: string;
}

export interface Finances {
  [key: string]: Year;
}

export interface Year {
  ca: number;
  resultat_net: number;
}

export interface Complements {
  collectivite_territoriale: CollectiviteTerritoriale;
  convention_collective_renseignee: boolean;
  egapro_renseignee: boolean;
  est_association: boolean;
  est_bio: boolean;
  est_entrepreneur_individuel: boolean;
  est_entrepreneur_spectacle: boolean;
  est_ess: boolean;
  est_finess: boolean;
  est_organisme_formation: boolean;
  est_qualiopi: boolean;
  liste_id_organisme_formation: string[];
  est_rge: boolean;
  est_service_public: boolean;
  est_societe_mission: boolean;
  est_uai: boolean;
  identifiant_association: any;
  statut_bio: boolean;
  statut_entrepreneur_spectacle: boolean;
}

export interface CollectiviteTerritoriale {
  code_insee: string;
  code: string;
  niveau: string;
  elus: Elu[];
}

export interface Elu {
  nom: string;
  prenoms: string;
  annee_de_naissance: string;
  fonction: string;
  sexe: string;
}
