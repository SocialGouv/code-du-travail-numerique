import { ConventionCollective } from "../../common/type/WizardType";
import { formatNumber } from "./common";

function formatSeniorityForIndemniteLicenciement(
  initialSeniority: string
): string {
  return formatNumber(parseInt(initialSeniority) * 12);
}

export const mapToPublicodesSituationForIndemniteLicenciement = (
  ccn: ConventionCollective | undefined,
  seniority: string,
  salaireRef: number
): Record<string, string> => {
  const agreement: Record<string, string> = ccn?.selected
    ? {
        "contrat salarié - convention collective": `'IDCC${ccn.selected.num
          .toString()
          .padStart(4, "0")}'`,
      }
    : { "contrat salarié - convention collective": "''" };
  return {
    ...agreement,
    ...{
      "contrat salarié - ancienneté":
        formatSeniorityForIndemniteLicenciement(seniority),
      "contrat salarié - salaire de référence": formatNumber(salaireRef),
      "contrat salarié - travailleur handicapé": "non",
      "indemnité de licenciement": "oui",
    },
  };
};
