import { InformationsStoreInput, InformationsStoreError } from "./types";

export const validateInformationsStep = (
  input: InformationsStoreInput
): InformationsStoreError => {
  const errors: InformationsStoreError = {};

  if (input.notificationDate && input.dismissalDate) {
    const notificationDate = new Date(input.notificationDate);
    const dismissalDate = new Date(input.dismissalDate);

    if (dismissalDate <= notificationDate) {
      errors.dismissalDate =
        "La date de fin de contrat doit être postérieure à la date de notification";
    }
  }

  if (
    input.salary &&
    (isNaN(Number(input.salary)) || Number(input.salary) <= 0)
  ) {
    errors.salary = "Veuillez saisir un salaire valide";
  }

  return errors;
};
