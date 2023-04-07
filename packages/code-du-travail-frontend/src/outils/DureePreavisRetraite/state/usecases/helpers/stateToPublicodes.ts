import { PreavisRetraiteFormState } from "../../../form";
import { formatIdcc } from "@socialgouv/modeles-social";

export const stateToPublicode = (
  values: PreavisRetraiteFormState
): Record<string, string> => {
  const { infos, origin, ccn, seniority } = values;
  const agreement: Record<string, string> = ccn?.selected?.num
    ? {
        "contrat salarié - convention collective": `'IDCC${formatIdcc(
          ccn.selected.num
        )}'`,
      }
    : {};
  const senioritySituation: Record<string, string> = seniority?.value
    ? {
        "contrat salarié - ancienneté": seniority.value,
      }
    : {};
  return {
    ...infos,
    ...agreement,
    ...senioritySituation,
    "contrat salarié - mise à la retraite":
      origin?.isRetirementMandatory ?? "non",
  };
};
