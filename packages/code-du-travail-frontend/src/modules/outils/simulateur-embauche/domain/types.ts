/**
 * Les quatre montants affichés par le simulateur. Chacun est éditable et,
 * une fois saisi, sert de point de départ (« seed ») au calcul des trois autres
 * — l'API URSSAF sait inverser son modèle sur ces quatre grandeurs.
 */
export type SalaryField =
  | "coutTotalEmployeur"
  | "salaireBrut"
  | "salaireNet"
  | "salaireNetApresImpot";

/** Période d'affichage. Le `seed` reste toujours canoniquement en €/mois. */
export type Period = "mois" | "annee";

export type ContractType =
  | "CDI"
  | "CDD"
  | "apprentissage"
  | "professionnalisation"
  | "stage";

/**
 * Résultat d'une évaluation.
 *
 * Les quatre montants sont exprimés dans l'unité correspondant à la période
 * demandée ; `salaireNetMensuel` et `smicNetMensuel` sont eux toujours en
 * €/mois, pour que le seuil de proximité au SMIC ne dépende pas de la période
 * d'affichage.
 */
export type SalaryResults = {
  coutTotalEmployeur: number | null;
  salaireBrut: number | null;
  salaireNet: number | null;
  salaireNetApresImpot: number | null;
  tauxImposition: number | null;
  /** Net avant impôt en €/mois, quelle que soit la période affichée. */
  salaireNetMensuel: number | null;
  /** Net avant impôt du SMIC, en €/mois. */
  smicNetMensuel: number | null;
};

/** Le point de départ d'un calcul : un champ et son montant, toujours en €/mois. */
export type SalarySeed = {
  field: SalaryField;
  amountMonthly: number;
};

export type EvaluateInput = SalarySeed & {
  period: Period;
  contract: ContractType;
};

/**
 * SMIC préchargé côté serveur pour alimenter le bouton « SMIC » dès le premier
 * rendu. `null` si le préchargement a échoué : la page doit rester utilisable.
 */
export type SmicReference = {
  brutMensuel: number;
  netMensuel: number;
};

export type ContextualMessageKey =
  | "salaire-minimum"
  | "primes-conventionnelles";

/** Unités que l'API peut nous renvoyer et que nous savons interpréter. */
export type KnownUnit = "€/mois" | "€/an" | "%";

/** Forme brute d'une unité publicodes telle que l'API la sérialise. */
export type UrssafUnit = {
  numerators?: string[];
  denominators?: string[];
};

export type UrssafEvaluation = {
  nodeValue?: unknown;
  unit?: UrssafUnit | null;
  error?: { message?: string } | null;
};

export type UrssafResponse = {
  evaluate?: UrssafEvaluation[];
};

/**
 * Ce que la lecture d'une réponse produit : les résultats exploitables, et la
 * liste des anomalies de contrat rencontrées. La lecture reste pure — c'est
 * l'appelant (couche API) qui décide de remonter ces anomalies à Sentry.
 */
export type ReadResult = {
  results: SalaryResults;
  issues: string[];
};
