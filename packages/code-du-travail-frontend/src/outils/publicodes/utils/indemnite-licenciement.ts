import { ConventionCollective } from "../../common/type/WizardType";
import { formatNumber, formatOuiNon } from "./common";

export const mapToPublicodesSituationForIndemniteLicenciement = (
  ccn: ConventionCollective | undefined,
  seniority: string,
  inaptitude: boolean,
  salaireRef?: number
): Record<string, string> => {
  const agreement: Record<string, string> = ccn?.selected
    ? {
        "contrat salarié . convention collective": `'IDCC${ccn.selected.num
          .toString()
          .padStart(4, "0")}'`,
      }
    : {};

  const salaireRef2: Record<string, string> | undefined = salaireRef
    ? {
        "contrat salarié . indemnité de licenciement légale . salaire de référence": `${salaireRef}`,
      }
    : undefined;

  const situation = {
    ...agreement,
    ...salaireRef2,
    ...{
      "contrat salarié . ancienneté en année": seniority,
      "contrat salarié . inaptitude suite à un accident ou maladie professionnelle":
        formatOuiNon(inaptitude),
      "indemnité de licenciement": "oui",
    },
  };
  console.log("Situation", situation);
  return situation;
};
