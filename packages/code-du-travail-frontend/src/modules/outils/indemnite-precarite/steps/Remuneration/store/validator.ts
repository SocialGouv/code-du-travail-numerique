import { RemunerationStoreInput, RemunerationStoreError } from "./types";

export const validateStep = (
  input: RemunerationStoreInput
): { isValid: boolean; errorState: RemunerationStoreError } => {
  const errorState: RemunerationStoreError = {};
  let isValid = true;

  if (!input.typeRemuneration) {
    errorState.typeRemuneration =
      "Veuillez sélectionner un mode de saisie de la rémunération";
    isValid = false;
  }

  if (input.typeRemuneration === "total") {
    if (!input.salaire || input.salaire <= 0) {
      errorState.salaire =
        "Veuillez saisir un montant total valide supérieur à 0";
      isValid = false;
    }
  } else if (input.typeRemuneration === "mensuel") {
    if (!input.dureeContrat || input.dureeContrat <= 0) {
      errorState.dureeContrat =
        "Veuillez sélectionner la durée du contrat en mois";
      isValid = false;
    }

    if (!input.salaires || input.salaires.length === 0) {
      errorState.salaires = "Veuillez saisir au moins un salaire mensuel";
      isValid = false;
    } else {
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
    }
  }

  return { isValid, errorState };
};
