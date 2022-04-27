import { PreavisRetraiteFormState } from "./form";

export const stateToPublicode = (
  values: PreavisRetraiteFormState
): Record<string, string> => {
  const { infos, origin, ccn } = values;
  const agreement: Record<string, string> = ccn?.selected
    ? {
        "contrat salarié - convention collective": `'IDCC${ccn.selected.num
          .toString()
          .padStart(4, "0")}'`,
      }
    : {};
  return {
    ...infos,
    ...agreement,
    "contrat salarié - mise à la retraite":
      origin?.isRetirementMandatory ?? "non",
    "contrat salarié - ancienneté": values.seniority?.value ?? "1",
  };
};
