import { StatusStoreInput, StatusStoreError } from "./types";

export const validateStatusStep = (
  input: StatusStoreInput
): StatusStoreError => {
  const errors: StatusStoreError = {};

  if (input.seriousMisconduct === undefined) {
    errors.seriousMisconduct =
      "Veuillez indiquer si le licenciement est pour faute grave";
  }

  if (input.seriousMisconduct === false && input.disabledWorker === undefined) {
    errors.disabledWorker =
      "Veuillez indiquer si le salarié est travailleur handicapé";
  }

  if (
    input.seriousMisconduct === false &&
    input.disabledWorker !== undefined &&
    !input.seniority
  ) {
    errors.seniority = "Veuillez sélectionner l'ancienneté";
  }

  return errors;
};
