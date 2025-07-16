import { RemunerationStoreInput, RemunerationStoreError } from "./types";

export const validateStep = (
  input: RemunerationStoreInput
): { isValid: boolean; errorState: RemunerationStoreError } => {
  const errorState: RemunerationStoreError = {};
  let isValid = true;

  // Validation du type de rémunération
  if (!input.typeRemuneration) {
    errorState.typeRemuneration =
      "Veuillez sélectionner un mode de saisie de la rémunération";
    isValid = false;
  }

  // Validation selon le type de rémunération
  if (input.typeRemuneration === "total") {
    // Validation du salaire total
    if (!input.salaire || input.salaire <= 0) {
      errorState.salaire =
        "Veuillez saisir un montant total valide supérieur à 0";
      isValid = false;
    }
  } else if (input.typeRemuneration === "mensuel") {
    // Validation des salaires mensuels
    if (!input.salaires || input.salaires.length === 0) {
      errorState.salaires = "Veuillez saisir au moins un salaire mensuel";
      isValid = false;
    } else {
      // Vérifier que tous les salaires sont valides et non nuls
      const hasInvalidSalary = input.salaires.some(
        (entry) =>
          entry.salaire === null ||
          entry.salaire === undefined ||
          entry.salaire <= 0
      );
      if (hasInvalidSalary) {
        errorState.salaires =
          "Tous les salaires mensuels doivent être renseignés et supérieurs à 0";
        isValid = false;
      }

      // Vérifier qu'il y a au moins 2 salaires mensuels
      const validSalaries = input.salaires.filter(
        (entry) =>
          entry.salaire !== null &&
          entry.salaire !== undefined &&
          entry.salaire > 0
      );
      if (validSalaries.length < 2) {
        errorState.salaires =
          "Veuillez saisir au moins 2 salaires mensuels valides";
        isValid = false;
      }
    }
  }

  return { isValid, errorState };
};
