// Migré depuis src/outils/IndemnitePrecarite/steps/situation.js
// Implémentation simplifiée pour la migration

// Pour l'instant, utilisation d'une implémentation simplifiée
export const getSupportedCCWithoutConventionalProvision = () => {
  // Retourne une liste basique de conventions collectives supportées
  return [
    { idcc: 3127, title: "Convention collective 3127" },
    { idcc: 1486, title: "Convention collective 1486" },
    { idcc: 2511, title: "Convention collective 2511" },
    { idcc: 1516, title: "Convention collective 1516" },
  ];
};

export const hasConventionalProvision = (idcc: string | number) => {
  const numericIdcc = typeof idcc === "string" ? parseInt(idcc) : idcc;
  // Liste des IDCC qui ont des dispositions conventionnelles
  const conventionalIdccs = [3127, 1486, 2511, 1516];
  return conventionalIdccs.includes(numericIdcc);
};

// Questions humanisées pour les critères
export const questions = {
  cddType: "Quel est le type de CDD ?",
  hasCdiProposal:
    "À la fin du CDD, le salarié a-t-il reçu une proposition de CDI ?",
  hasCdiRenewal:
    "À la fin du CDD, le salarié a-t-il été immédiatement embauché en CDI ?",
  hasEquivalentCdiRenewal:
    "À la fin du CDD, le salarié a-t-il été immédiatement embauché en CDI, sans interruption, sur un même poste ou sur un poste différent ?",
};

// Labels pour les critères
export const labels = {
  ccn: "convention collective",
  cddType: "type de cdd",
  hasCdiProposal: "proposition d'un cdi",
  hasCdiRenewal: "renouvellement en cdi",
  hasEquivalentCdiRenewal: "renouvellement en cdi équivalent",
};

// Ordre des critères pour les questions dynamiques
export const criteriaOrder = [
  "cddType",
  "hasCdiProposal",
  "hasCdiRenewal",
  "hasEquivalentCdiRenewal",
];

// Validation des situations selon les critères
export function validateSituation(
  criteria: Record<string, any> = {},
  errors: Record<string, any> = {}
) {
  // Implémentation simplifiée pour la validation
  // TODO: Implémenter la logique complète de validation des situations
  return { ...errors };
}

// Contrats exclus de l'indemnité de précarité
export const excludeContracts = [
  "CDD saisonnier",
  "CDD conclu avec un jeune (mineur ou majeur) pendant ses vacances scolaires ou universitaires",
  "CCD dans le cadre d'un congé de mobilité",
  "Contrat unique d'insertion (CUI) ou Parcours emploi compétences (PEC)",
  "Contrat de professionnalisation ou Contrat d'apprentissage",
  "Contrat pour lequel l'employeur s'est engagé à assurer un complément de formation professionnelle au salarié",
];

// Validation spécifique pour certaines conventions collectives
export function validateSpecificConventions(
  values: Record<string, any>
): Record<string, any> {
  const errors: Record<string, any> = {};

  // Convention collective 3127
  if (
    values?.ccn?.selected?.num === 3127 &&
    values?.criteria?.cddType ===
      "CDD dit de « mission ponctuelle ou occasionnelle »" &&
    values?.criteria?.hasEquivalentCdiRenewal === "oui"
  ) {
    errors.criteria = {
      hasEquivalentCdiRenewal:
        "Selon votre convention collective, lorsque le contrat de mission ponctuelle est transformé en CDI pour un poste et une durée équivalents, le salarié n'a pas le droit à une prime d'intervention.",
    };
  }

  // Convention collective 1486
  if (
    values?.ccn?.selected?.num === 1486 &&
    values?.criteria?.cddType ===
      "Contrat d'intervention dans le secteur d'activité d'organisation des foires, salons et congrès" &&
    values?.criteria?.hasCdiProposal === "oui"
  ) {
    errors.criteria = {
      hasCdiProposal:
        "Selon votre convention collective, le salarié en contrat d'intervention qui, à l'issue de son contrat, a reçu une proposition d'un CDI, n'a pas le droit à une prime d'intervention.",
    };
  }

  // Convention collective 2511
  if (
    values?.ccn?.selected?.num === 2511 &&
    values?.criteria?.cddType ===
      "CDD d'usage appelé contrat «d'intervention»" &&
    values?.criteria?.hasCdiRenewal === "oui"
  ) {
    errors.criteria = {
      hasCdiRenewal:
        "Selon votre convention collective, lorsque le contrat d'intervention est transformé en CDI, le salarié n'a pas le droit à une prime d'intervention.",
    };
  }

  // Convention collective 1516
  if (
    values?.ccn?.selected?.num === 1516 &&
    values?.criteria?.cddType === "CDD d'usage" &&
    values?.criteria?.hasCdiRenewal === "oui"
  ) {
    errors.criteria = {
      hasCdiRenewal: `Selon votre convention collective, le salarié en contrat d'usage qui, à l'issu de son contrat, poursuit par un CDI, n'a pas le droit à une indemnité dite "d'usage".`,
    };
  }

  return errors;
}

// Vérifier si un contrat est exclu de l'indemnité de précarité
export function isContractExcluded(cddType: string): boolean {
  return excludeContracts.includes(cddType);
}

// Obtenir le message d'erreur pour un contrat exclu
export function getExclusionMessage(cddType: string): string {
  if (isContractExcluded(cddType)) {
    return "Ce type de contrat ne permet pas au salarié d'avoir droit à une prime de précarité.";
  }
  return "";
}
