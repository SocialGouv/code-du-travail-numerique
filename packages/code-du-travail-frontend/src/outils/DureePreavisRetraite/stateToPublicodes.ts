import { PreavisRetraiteFormState } from "./types";

export const stateToPublicode = (
  values: PreavisRetraiteFormState
): Record<string, string> => {
  const { infos, origin } = values;
  return {
    ...infos,
    "contrat salarié - mise à la retraite":
      origin?.isRetirementMandatory ?? "non",
    "contrat salarié - convention collective": "'IDCC1090'",
    "contrat salarié - ancienneté": values.seniority?.value ?? "1",
  };
};
