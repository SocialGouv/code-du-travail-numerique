import { deepEqualObject } from "src/lib";
import { InformationsStoreInput, InformationsStoreError } from "./types";

export const validateInformationsStepWithState = (
  input: InformationsStoreInput
) => {
  const errorState: InformationsStoreError = {
    dismissalDate:
      input.notificationDate && input.dismissalDate
        ? (() => {
            const notificationDate = new Date(input.notificationDate);
            const dismissalDate = new Date(input.dismissalDate);
            return dismissalDate <= notificationDate
              ? "La date de fin de contrat doit être postérieure à la date de notification"
              : undefined;
          })()
        : undefined,
    salary:
      input.salary && (isNaN(Number(input.salary)) || Number(input.salary) <= 0)
        ? "Veuillez saisir un salaire valide"
        : undefined,
  };

  return {
    isValid: deepEqualObject(errorState, {
      dismissalDate: undefined,
      salary: undefined,
    }),
    errorState,
  };
};
