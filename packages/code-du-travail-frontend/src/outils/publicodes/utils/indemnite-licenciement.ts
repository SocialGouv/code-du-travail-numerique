import { ConventionCollective } from "../../common/type/WizardType";
import { formatNumber, formatSeniority } from "./common";

export const mapToPublicodesSituationForIndemniteLicenciement = (
  ccn: ConventionCollective,
  seniority: string,
  salaireRef: number
): Record<string, string> => {
  const agreement: Record<string, string> = ccn
    ? {
        "contrat salarié - convention collective": `'IDCC${ccn.num
          .toString()
          .padStart(4, "0")}'`,
      }
    : {};
  return {
    ...{
      "contrat salarié - ancienneté": formatSeniority(seniority),
    },
    ...{
      "contrat salarié - salaire de référence": formatNumber(salaireRef),
    },
    ...agreement,
    ...{
      "indemnité de licenciement": "oui",
    },
  };
};
