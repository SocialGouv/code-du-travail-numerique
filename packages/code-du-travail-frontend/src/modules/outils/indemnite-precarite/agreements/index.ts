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
