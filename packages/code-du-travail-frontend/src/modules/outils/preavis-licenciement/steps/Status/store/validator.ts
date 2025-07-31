import { deepEqualObject } from "src/lib";
import { StatusStoreInput, StatusStoreError } from "./types";

export const validateStatusStepWithState = (input: StatusStoreInput) => {
  const errorState: StatusStoreError = {
    seriousMisconduct:
      input.seriousMisconduct === undefined
        ? "Veuillez indiquer si le licenciement est pour faute grave"
        : input.seriousMisconduct === true
          ? "Pas de préavis en cas de faute grave"
          : undefined,
    disabledWorker:
      input.seriousMisconduct === false && input.disabledWorker === undefined
        ? "Veuillez indiquer si le salarié est travailleur handicapé"
        : undefined,
    seniority:
      input.seriousMisconduct === false &&
      input.disabledWorker !== undefined &&
      !input.seniority
        ? "Veuillez sélectionner l'ancienneté"
        : undefined,
  };

  return {
    isValid: deepEqualObject(errorState, {
      seriousMisconduct: undefined,
      disabledWorker: undefined,
      seniority: undefined,
    }),
    errorState,
  };
};
