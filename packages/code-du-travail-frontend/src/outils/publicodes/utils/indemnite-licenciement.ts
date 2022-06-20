import { ConventionCollective } from "../../common/type/WizardType";
import { formatNumberAsString } from "./common";

export const mapToPublicodesSituationForIndemniteLicenciement = (
  ccn: ConventionCollective | undefined,
  seniority: number,
  salaireRef: number,
  inaptitude: boolean
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
      "contrat salarié - ancienneté en année": formatNumberAsString(seniority),
      //TODO: à virer
      "contrat salarié - convention collective - batiment ouvriers employés - indemnité de licenciement - salaire de référence":
        formatNumberAsString(salaireRef),
      "contrat salarié - salaire de référence":
        formatNumberAsString(salaireRef),
      "contrat salarié - inaptitude suite à un accident ou maladie professionnelle":
        inaptitude ? "oui" : "non",
      "indemnité de licenciement": "oui",
    },
  };
};
